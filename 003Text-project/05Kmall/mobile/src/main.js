import Vue from 'vue'
import App from './App'
import './assets/css/common.css'
import './pages/plugins/index.js'
import router from './router/index.js'

Vue.config.productionTip = false
import store from './store'

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')