import firebase from "firebase"

class Ad {
  constructor(title, description,
    ownerId, src = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.src = src
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [],
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => {
        return a.id === id
      })
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd({ commit }, payload) {
      //payload.id = '6'
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(payload.title, payload.description,
          firebase.auth().currentUser.uid, '', payload.promo)
          
          // асинхронно создаем новый элемент рекламы в нашей базе данных
          // получаем объект ad, у которого есть определенный ключ
          const ad = await firebase.database().ref('ads').push(newAd)
          // в данной переменной будет храниться расширение картинки
          const imageExt = image.name.slice(image.name.lastIndexOf('.'))

          const fileData = await firebase.storage().ref(`ads/${ad.key}${imageExt}`).put(image)
          // получаем url картинки
          const imageSrc = await fileData.ref.getDownloadURL()
          
          await firebase.database().ref('ads').child(ad.key).update({
            src: imageSrc
          })

          commit('setLoading', false)
          commit('createAd', {
            ...newAd,
            id: ad.key,
            // заменяем поле src на imageSrc, которое мы получили с сервера
            src: imageSrc
          })
        } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchAds({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultAds = []

      try{
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          // все данные, относящиеся к нужному нам объявлению
          const ad = ads[key]
          resultAds.push(
            new Ad(ad.title, ad.description, 
              ad.ownerId, ad.src, ad.promo, key)
          )
        })

        commit('loadAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}) {
      // метод, где мы чистим ошибки
      commit('clearError')
      // метод, чтобы обозначить, что мы загружаем что-либо с сервера
      commit('serLoading', true)

      try {
        await firebase.database().ref('ads').child(id).update({
          title, description
        })
        commit('updateAd', {
          title, description, id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
      
    }
  },
  getters: {
    ads(state) {
      return state.ads
    },
    promoAds(state) {
      return state.ads.filter(ad => {
        //return ad.promo === true
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById(state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}