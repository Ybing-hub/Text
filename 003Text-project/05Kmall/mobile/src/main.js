import Vue from 'vue'
import App from './App'
import './assets/css/common.css'
import router from './router/index.js'

Vue.config.productionTip = false
import store from './store'
import './plugins/index.js'

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')