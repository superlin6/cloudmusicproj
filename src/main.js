import Vue from 'vue'
import Vant from 'vant';
import App from './App.vue'
import router from './router'
import store from './store'

import VueBus from 'vue-bus'
Vue.use(VueBus);
import 'vant/lib/index.css';
Vue.use(Vant);


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

