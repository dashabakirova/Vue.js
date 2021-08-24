<template>
  <v-container>
    <v-row>
      <v-col xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular
          :size="100"
          :width="4"
          color="warning"
          indeterminate
        ></v-progress-circular>
      </v-col>

      <!-- <v-col xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0"> -->
      <v-col xs12 sm6 offset-sm3 v-else-if="!loading">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list flat subheader three-line>
          <v-list-item v-for="order in orders" :key="order.id">
            <v-list-item-action>
              <v-checkbox
                color="success"
                :input-value="order.done"
                @change="markDone(order)"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ order.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                class="white--text"
                color="#7395AE"
                :to="'/ad/' + order.adId"
                >Open</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- <v-col xs12 class="text-xs-center pt-5" v-else>
        <h1 class="text--secondary">You have no orders</h1>      
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    orders() {
      return this.$store.getters.orders;
    },
  },
  methods: {
    markDone(order) {
      this.$store
        .dispatch("markOrderDone", order.id)
        .then(() => {
          order.done = true;
        })
        .catch(() => {});
    },
  },
  created: function () {
    this.$store.dispatch("fetchOrders");
  },
};
</script>
