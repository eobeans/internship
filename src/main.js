/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 18:13:45
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/index'
import './styles/index.scss'
import ElementUI from 'element-ui';
import "../src/mock/index";

Vue.use(VueResource)
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
