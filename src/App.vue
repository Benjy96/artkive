<template>
  <v-app>
    <v-app-bar app flat hide-on-scroll>
      <v-spacer></v-spacer>
      <v-btn
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
          <router-view class="mx-auto"/>
        </v-fade-transition>
      </v-container>
    </v-content>
    
    
  </v-app>
</template>