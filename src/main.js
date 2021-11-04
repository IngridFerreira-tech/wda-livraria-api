import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from "sweetalert2/dist/sweetalert2.js"
import VueApexCharts from 'vue-apexcharts'
import VueChartkick from 'vue-chartkick'



Vue.use(VueChartkick)
Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false
});
window.Toast = Toast;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
