<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar>

    <v-content>
      <Timeline/>
    </v-content>
  </v-app>
</template>

<script>
import Timeline from './components/Timeline';

export default {
  name: 'App',

  components: {
    Timeline,
  },

  data: () => ({
    //
  }),
};
</script>
