import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import Buefy from 'buefy'
import auth from './auth'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

import 'buefy/dist/buefy.css'
import './assets/style.css'

Vue.use(Buefy)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)

Object.defineProperty(Vue.prototype, '$auth', { value: auth })
Object.defineProperty(Vue.prototype, '$axios', { value: axios })

axios.defaults.baseURL = 'https://api.monobank.ua/'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
