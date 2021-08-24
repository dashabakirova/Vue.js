<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb3">Create new ad</h1>
        <v-form v-model="valid" ref="form" lazy-validation class="mb-3">
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            required
            :rules="[(v) => !!v || 'Title is required']"
          ></v-text-field>
          <!-- <v-text-field
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            multi-line
            :rules="[v => !!v || 'Description is required']"
          ></v-text-field> -->
          <v-textarea
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :rules="[(v) => !!v || 'Description is required']"
          ></v-textarea>
          <v-layout row>
            <v-flex xs12>
              <v-btn
                class="warning ma-2 white--text"
                @click="triggerUpload"
              >
                Upload
                <v-icon right dark> mdi-cloud-upload </v-icon>
              </v-btn>
              <input 
                ref="fileInput" 
                type="file" 
                style="display: none;" 
                accept="image/*"
                @change="onFileChange"
              >
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <img :src="imageSrc" height="100" v-if="imageSrc"/>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-switch color="#7395AE" v-model="promo" 
              :label="'Add to promo?'"></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12>
              <v-spacer></v-spacer>
              <v-btn
                :loading="loading"
                :disabled = "!valid || !image || loading"
                class="white--text" color="#7395AE"
                @click="createAd"
            >Create ad</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    };
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
      createAd () {
          if (this.$refs.form.validate() && this.image) {
              // logic
              const ad = {
                  title: this.title,
                  description: this.description,
                  promo: this.promo,
                  image: this.image
              }
              
              this.$store.dispatch('createAd', ad)
              .then(() => {
                this.$router.push('/list')
              })
              .catch(() => {})
          }
      },
      triggerUpload () {
        this.$refs.fileInput.click()
      },
      onFileChange (event) {
        const file = event.target.files[0]
        
        const reader = new FileReader()
        reader.onload = () => {
          this.imageSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
      }
  }
};
</script>
