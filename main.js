import Vue from 'vue'
import App from './src/App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(Vuex)

require("./assets/css/main.scss")

new Vue({
  el: 'div',
  render: h => h(App)
})

Vue.filter('round', function (value) {
  return Math.round(value * 100)/100
})
