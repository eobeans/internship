/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-01 22:44:01
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/index'
import './styles/index.css'

Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
