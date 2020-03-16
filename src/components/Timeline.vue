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

              <!-- Title & Edit Button -->
              <v-card-title class="display-1 font-weight-light" v-if="!editMode">
                <v-btn v-if="$root.user" @click="editMode = true" icon class="mr-2">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{item.title}}
              </v-card-title>

              <v-card-title class="display-1 font-weight-light" v-else>
                <v-btn v-if="$root.user && editMode" @click="editMode = false" icon class="mr-2" color="error">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn v-if="$root.user && editMode" @click="updateArtwork(index)" icon class="mr-2" color="success">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-text-field class="display-1 font-weight-light" v-model="item.title"></v-text-field>
              </v-card-title>

              <!-- Image -->
              <v-img :src="item.image"></v-img>

              <!-- Description edit input & description -->
              <v-card-text v-if="editMode">
                <v-textarea clearable v-model="item.description"></v-textarea>
              </v-card-text>
              <v-card-text v-else-if="item.description.length > 0">
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
    editMode: false,
    timelineItems: []
  }),
  methods: {
    getAssetImg(src) {
      return require("@/assets/" + src);
    },
    updateArtwork(artworkIndex) {
      this.editMode = false;
      let artwork = this.timelineItems[artworkIndex];
      FirebaseService.updateArtwork(artwork.id, artwork.title, artwork.description);
    }
  },
}
</script>
