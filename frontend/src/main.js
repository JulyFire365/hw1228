import Vue from 'vue';
import axios from "axios";
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import App from './App.vue';
import 'reset-css';

Vue.use(VueAxios, axios)

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')