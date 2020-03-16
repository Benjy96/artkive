<template>
  <div class="home">
    <Timeline :artist="artist"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Timeline from '@/components/Timeline.vue'

export default {
  name: 'Home',
  components: {
    Timeline
  },
  data() {
    return {
      artist: 'zOjtgHJOHCXgRk6mgYhG1ZvTdxy2'
    }
  }
}
</script>
