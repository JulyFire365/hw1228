import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import '@/assets/styles/index.scss' // global css

import App from './App.vue'
import store from './store'
import router from './router'
// import './router/permission' // permission control

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
