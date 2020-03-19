<template>
  <div>
    <v-row>
      <v-col>
        <v-card class="elevation-4">
          <v-form ref="artworkForm">
            <v-container>
              <v-row class="mx-5">
                <v-card-title class="display-1">Add a new artwork</v-card-title>
                <v-col cols="12">
                  <v-text-field label="Title" v-model="title" prepend-icon="mdi-text-short"
                  required :rules="requiredRule"
                  />
                </v-col>

                <v-col>
                  <DatePicker :initialDate="date" v-on:date-saved="date = $event"/>
                </v-col>

                <v-col>
                  <v-file-input v-model="image"
                  label="Image"
                  show-size
                  accept=".jpg"
                  prepend-icon="mdi-camera"
                  required :rules="imageRules"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    label="Description"
                    prepend-icon="mdi-card-text"
                    v-model="description"
                  />
                </v-col>
                <v-col cols="12" align="right">
                  <v-btn
                    @click="saveArtwork"
                    class="mx-auto font-weight-light"
                    color="success"
                  >
                    Save
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="4" v-if="previewImage">
        <v-card>
          <v-card-title v-if="title != ''">{{title}}</v-card-title>
          <v-img :src="previewImage"></v-img>
          <v-card-text v-if="description != ''">{{description}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

import DatePicker from '@/components/DatePicker'

export default {
  components: {
    DatePicker
  },
  data() {
    return {
      image: null,
      description: '',
      title: '',
      date: new Date().toISOString().substr(0, 10),
      previewImage: null
    }
  },
  methods: {
    saveArtwork() {
      if(this.$refs.artworkForm.validate()) {
        this.$emit("loading-started");

        FirebaseService.saveArtwork(this.title, this.description, this.date, this.image).then(() => {
          this.$emit("loading-finished");
          this.$router.push({name: 'Artist', params: { artist: this.$root.user.uid }})
        });
      }
    }
  },
  computed: {
    requiredRule() {
      const rules = [];

      let lengthNotZeroRule = value => value.length > 0 || 'Required';

      rules.push(lengthNotZeroRule);

      return rules;
    },
    imageRules() {
      const rules = [];

      let imageNotNullRule = value => value != null || 'You must provide an image';
      let limitFileSizeRule = value => (value != null && value.size < 1000000) || 'Images should be smaller than 1MB. Please compress your image.';

      rules.push(imageNotNullRule, limitFileSizeRule);

      return rules;
    }
  },
  watch: {
    image: function(file) {
      let vueInstance = this;
      
      let reader = new FileReader();
      reader.onload = function(event) {
        // window.console.log(this);
        // capturing vueInstance above as in this method, this refers to the FileReader
        // In an object method, this refers to the "owner" of the method.
        vueInstance.previewImage = event.target.result;
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
