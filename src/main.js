import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import firebase from 'firebase'
import BuyModalComponent from './components/Shared/BuyModal'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB9pM1VS8Cc0xcuyaYsA1zAUOGf8pQUr9U',
      authDomain: 'itc-ads-tn.firebaseapp.com',
      projectId: 'itc-ads-tn',
      storageBucket: 'itc-ads-tn.appspot.com',
      messagingSenderId: '930774689148',
      appId: '1:930774689148:web:c8cdc1ba52ec0519bc6c91'
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogin', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
