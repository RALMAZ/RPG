import Vue from 'vue'
import axios from 'axios'

import App from './App'
import store from './store'
import game from './game'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.game = Vue.prototype.$game = game
Vue.config.productionTip = false

new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app')
