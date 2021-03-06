<template>
  <v-container>
    <v-row class="text-center">

      <v-col >
        <h1 v-if="firstname" class="display-2 mb-12 font-weight-light">
          {{firstname}}'s Artkive
        </h1>
      </v-col>

      <v-col cols="12">

        <v-timeline>
          <v-timeline-item v-for="(item, index) in timelineItems" :key="index" color="indigo lighten-4">

            <!-- Date -->
            <span v-if="index != artworkBeingEditedIndex" slot="opposite" class="headline font-weight-light">{{item.date}}</span>
            <span v-else slot="opposite" class="headline font-weight-light">
              <DatePicker :initialDate="item.date" v-on:date-saved="item.date = $event"></DatePicker>
            </span>

            <v-card class="elevation-4">

              <!-- Title & Edit Button -->
              <v-card-title class="display-1 font-weight-light" v-if="index != artworkBeingEditedIndex">
                <v-btn v-if="$root.user" @click="enableEditing(index)" icon class="mr-2">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                {{item.title}}
              </v-card-title>

              <v-card-title class="display-1 font-weight-light" v-else>
                <v-btn v-if="$root.user && index == artworkBeingEditedIndex" @click="cancelEditing" icon class="mr-2">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn v-if="$root.user && index == artworkBeingEditedIndex" @click="updateArtwork(index)" icon class="mr-2" color="success">
                  <v-icon>mdi-check</v-icon>
                </v-btn>

                <v-text-field class="display-1 font-weight-light" v-model="item.title"></v-text-field>

                <v-btn v-if="$root.user && index == artworkBeingEditedIndex" @click="deleteArtwork(index)" icon class="ml-2" color="error">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>

              </v-card-title>

              <!-- Image -->
              <v-img :src="item.image"></v-img>

              <!-- Description edit input & description -->
              <v-card-text v-if="index == artworkBeingEditedIndex">
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

import DatePicker from '@/components/DatePicker'

export default {
  name: 'Timeline',
  props: ["artist"],
  components: {
    DatePicker
  },
  created() {
    FirebaseService.getArtistName(this.artist).then(firstname => {
      this.firstname = firstname;
    });

    FirebaseService.getArtworks(this.artist).then((res) => {
      this.timelineItems = res;
    });
  },
  data: () => ({
    firstname: null,
    artworkBeingEditedIndex: -1,
    timelineItems: []
  }),
  methods: {
    getAssetImg(src) {
      return require("@/assets/" + src);
    },
    updateArtwork(artworkIndex) {
      this.artworkBeingEditedIndex = -1;
      let artwork = this.timelineItems[artworkIndex];
      FirebaseService.updateArtwork(artwork.id, artwork.title, artwork.description, artwork.date);
    },
    deleteArtwork(artworkIndex) {
      if(confirm("Are you sure you wish to delete this?")) {
        this.artworkBeingEditedIndex = -1;
        let artworkID = this.timelineItems[artworkIndex].id;

        this.timelineItems = this.timelineItems.filter(x => x.id != artworkID);

        FirebaseService.deleteArtwork(artworkID);
      }
    },
    enableEditing(index) {
      this.artworkBeingEditedIndex = index;
    },
    cancelEditing() {
      this.artworkBeingEditedIndex = -1;
    }
  }
}
</script>