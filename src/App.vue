<template>
  <v-app>
    <v-app-bar app flat hide-on-scroll color="purple lighten-4">
      <v-btn
        v-if="$root.user != null"
        text
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        v-if="$root.user != null"
        class="mr-2"
        text
        to="/Dashboard"
      >
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>

      <v-btn
        v-if="$root.user == null"
        class="mr-2"
        text
        to="/Login"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn
        v-if="$root.user == null"
        class="mr-2"
        text
        to="/Register"
      >
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>

      <!-- route to own timeline if logged in -->
      <v-btn
        v-if="$root.user"
        class="mr-2"
        text
        :to="'/' + $root.user.uid"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn
        v-else
        class="mr-2"
        text
        to="/"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-fade-transition mode="out-in">
          <router-view 
          v-on:open-generic-dialog="openGenericDialog($event)"
          v-on:loading-started="loading = true" v-on:loading-finished="loading = false" 
          class="mx-auto my-8"
          />
        </v-fade-transition>
      </v-container>
    </v-content>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <!-- vm.$emit( eventName, […args] ) -->
    <!-- https://vuejs.org/v2/api/#vm-emit -->
    <v-dialog v-model="genericDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{genericDialogTitle}}</v-card-title>
        <v-card-text>{{genericDialogText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="genericDialogTitle == 'Information'" color="primary" @click="genericDialog = false">Ok</v-btn>
          <v-btn v-else color="error darken-1" @click="genericDialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      loading: false,
      genericDialog: false,
      genericDialogTitle: 'Information',
      genericDialogText: ''
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$root.user = null;
      } else {
        this.$root.user = user;
        if(this.$route.name != 'Home') this.$router.push('/');
      }
      
    });
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    },
    openGenericDialog(event) {
      this.genericDialogTitle = event[0];
      this.genericDialogText = event[1];
      this.genericDialog = true;
    }
  }
}
</script>