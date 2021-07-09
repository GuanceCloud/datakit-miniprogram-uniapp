import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
//#ifndef H5 || APP-PLUS || APP-NVUE || APP-PLUS-NVUE
const { datafluxRum } = require('./miniprogram/dataflux-rum-uniapp')
datafluxRum.init(Vue, {
	datakitOrigin: 'http://172.16.2.201:31845',
	applicationId: 'appid_6cb4c98eba9143c88c83e544407b1c74',
	env: 'prod',
	version: '1.0.0',
	trackInteractions: true,
})
//#endif
const app = new Vue({
	...App,
})
app.$mount()
