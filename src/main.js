/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-07-10 12:40:44
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
import store from './store/index';
import './styles/index.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './mock/index'

Vue.use(VueResource)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
