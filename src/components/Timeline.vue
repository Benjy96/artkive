<template>
  <v-container>
    <v-row class="text-center">

      <v-col>
        <h1 class="display-2 mb-12 font-weight-light">
          Welcome to Ninoska's Artkive
        </h1>
      </v-col>

      <v-col cols="12">

        <v-timeline>
          <v-timeline-item v-for="(item, index) in timelineItems" :key="index">
            <span slot="opposite" class="headline font-weight-light">{{item.date}}</span>
            <v-card class="elevation-4">
              <v-card-title class="display-1 font-weight-light">{{item.title}}</v-card-title>
              <v-img :src="item.image"></v-img>
              <v-card-text v-if="item.description.length > 0" class="text-align">
                {{item.description}}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
  name: 'Timeline',
  props: ["artist"],
  created() {
    FirebaseService.getArtworks(this.artist).then((res) => {
      this.timelineItems = res;
    });
  },
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
