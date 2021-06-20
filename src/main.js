/*
 * @Autor: eobeans
 * @Date: 2021-05-27 22:42:25
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-20 17:12:11
 * @Version: 0.1.0
 * @Description: 
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/index'
import './styles/index.scss'
import ElementUI from 'element-ui'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './mock/index'

Vue.use(VueResource)
Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  capture: false,
  select: {
      arrow: 'md-arrow-dropdown',
      arrowSize: 20
  }
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
