<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="my-8">
        <h1 class="display-2 mb-3">
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
    props: ["artist"],
    data: () => ({
      timelineItems: []
    }),
    methods: {
      getAssetImg(src) {
        return require("@/assets/" + src);
      }
    }
  }
</script>
