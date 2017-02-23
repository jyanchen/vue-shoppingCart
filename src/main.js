import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(VueResource)
const vm = new Vue({
  el: '#app',
  template: '<App pageTitle="购物车" />',
  components: { App }
})
