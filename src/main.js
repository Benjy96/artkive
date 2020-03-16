import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify'

// Initialise Firebase
import './firebaseInit'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  data() {
    return {
      user: null
    }
  },
  render: h => h(App)
}).$mount('#app')
