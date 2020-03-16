<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="my-8">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Artkive
        </h1>
      </v-col>

      <v-col cols="12">

        <v-timeline>
          <v-timeline-item v-for="(item, index) in timelineItems" :key="index">
            <span slot="opposite">{{item.date}}</span>
            <v-card class="elevation-2">
              <v-card-title class="headline">{{item.title}}</v-card-title>
              <v-img :src="getAssetImg(item.src)"></v-img>
              <v-card-text>
                {{item.text}}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Timeline',

    data: () => ({
      timelineItems: [
        {
          src: 'ojosbrillantes.jpg', 
          title: 'Ojos Brillantes', 
          text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.', 
          date: '20 Jan 2020'

        }
      ]
    }),
    methods: {
      getAssetImg(src) {
        return require("@/assets/" + src);
      }
    }
  }
</script>
