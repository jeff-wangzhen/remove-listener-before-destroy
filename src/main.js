import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


const notify = new Vue();
Vue.prototype.notify = notify;

new Vue({
  render: h => h(App),
}).$mount('#app')
