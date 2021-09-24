import Vue from 'vue'

// Import plugins
import App from './App.vue'
import router from './plugins/router'
import vuetify from "./plugins/vuetify"

Vue.config.productionTip = true

new Vue({
    el: '#app',
    router,
    vuetify,
    render: h => h(App),
}).$mount('#app')
