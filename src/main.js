import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 创建第三方组件，专门用于事件派发与监听
const notify = new Vue();
Vue.prototype.notify = notify;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
