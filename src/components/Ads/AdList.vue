<template>
  <v-container>
    <v-row v-if="!loading && myAds.length !== 0">
      <v-col xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-6">My ads</h1>
        <v-card class="elevation-10 mb-6" v-for="ad in myAds" :key="ad.id">
          <v-row>
            <v-col md="4">
              <v-img :src="ad.src" height="160px"></v-img>
            </v-col>
            <v-col md="8">
              <v-card-text>
                <h2 class="text--primary">{{ ad.title }}</h2>
                <p>{{ ad.description }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="white--text" color="#7395AE" :to="'/ad/' + ad.id"
                  >Open</v-btn
                >
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- уже не происходит загрузки, но при этом нет элементов -->
    <v-row v-else-if="!loading && myAds.length === 0">
      <v-col xs12 sm6 class="text-xs-center">
        <h1 class="text--secondary">You have no ads</h1>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col xs12 sm6 class="text-xs-center">
        <v-progress-circular
          :size="100"
          :width="4"
          color="warning"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  computed: {
    myAds() {
      return this.$store.getters.myAds;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>
