<template>
  <div class="fade-in">
    <div v-if="!artist" class="text-center">
      <v-row>
        <v-col>
          <h1  class="display-4 mt-12 font-weight-thin">
            Welcome to Artkive
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h2 class="display-1 font-weight-thin">
            Your very own portfolio
          </h2>
        </v-col>
      </v-row>
    </div>

    <!-- Could move this to pages, but may want to use on artist dashboard as a component -->
    <!-- TODO: If home component gets any more complex, split this into a /timeline/:id route -->
    <Timeline v-else :artist="artist"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Timeline from '@/components/Timeline.vue'

export default {
  props: ["artist"],
  name: 'Home',
  components: {
    Timeline
  }
}
</script>

<style scoped>
.fade-in * {
  animation-name: fade;
  animation-duration: 2s;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
