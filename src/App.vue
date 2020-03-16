<template>
  <v-app>
    <v-app-bar app flat hide-on-scroll color="purple lighten-4">
      <v-btn
        v-if="user"
        text
        @click="logout"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        v-if="user"
        class="mr-2"
        text
        to="/Dashboard"
      >
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>

      <v-btn
        v-else
        class="mr-2"
        text
        to="/Login"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn
        class="mr-2"
        text
        to="/"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-fade-transition>
          <router-view class="mx-auto my-8"/>
        </v-fade-transition>
      </v-container>
    </v-content>
    
    
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.user = null;
        this.$router.push('/login');
      } else {
        this.user = user;
        this.$router.push('/');
      }
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  }
}
</script>