import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueTelInput from 'vue-tel-input'

Vue.use(VueTelInput);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)
});
