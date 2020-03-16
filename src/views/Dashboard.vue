<template>
  <div>
    <v-row>
      <v-col cols="8">
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
                  <v-text-field label="Date" v-model="date" prepend-icon="mdi-calendar"
                  required :rules="requiredRule"
                  />
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
                    @click="add"
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
    </v-row>
  </div>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'

export default {
  data() {
    return {
      image: null,
      description: '',
      title: '',
      date: ''
    }
  },
  methods: {
    add() {
      if(this.$refs.artworkForm.validate()) {
        FirebaseService.saveArtwork(this.title, this.description, this.date, this.image).then(() => {
          this.$router.push({name: 'Home'})
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
      let limitFileSizeRule = value => (value != null && value.size < 1000000) || 'File size is too large';

      rules.push(imageNotNullRule, limitFileSizeRule);

      return rules;
    }
  }
}
</script>