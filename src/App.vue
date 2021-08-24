<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list>
        <v-list-item v-for="link in links" :key="link.title" :to="link.url">
          <v-list-item-icon>
            <v-icon> {{ link.icon }} </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="link.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout">
          <v-list-item-icon>
            <v-icon> mdi-exit-to-app </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'Log out'" v-if="isUserLoggedIn"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar app color="#7395AE" dense dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up">
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link 
          to="/" 
          tag="span" 
          class="pointer"
        >Adv app</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-for="link in links"
        :key="link.title"
        :to="link.url"
        class="hidden-sm-and-down"
        plain
      >
        <v-icon left>{{ link.icon }}</v-icon>
        {{ link.title }}
      </v-btn>
      <v-btn @click="onLogout" plain v-if="isUserLoggedIn">
        <v-icon left>mdi-exit-to-app</v-icon>
        Log out
      </v-btn>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        color="warning"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn class="white--text" @click="closeError" text> Close </v-btn>
      </v-snackbar>
    </template>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  // data () {
  //   return {
  //     drawer: false
  //   }
  // }
  data: () => ({
    drawer: false,
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Orders", icon: "mdi-bookmark-outline", url: "/orders" },
          { title: "New ad", icon: "mdi-file-plus", url: "/new" },
          { title: "My ads", icon: "mdi-format-list-checkbox", url: "/list" },
        ];
      }
      return [
        { title: "Login", icon: "mdi-lock", url: "/login" },
        { title: "Registration", icon: "mdi-face", url: "/registration" },
      ];
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch("clearError");
    },
    onLogout() {
      this.$store.dispatch("logoutUser");
      // чтобы при выходе из учетной записи перейти на домашнюю страницу
      this.$router.push('/')
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
