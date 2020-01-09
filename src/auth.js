import Vue from 'vue'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import store from './store'

Vue.use(VueCookies)

export default {
    isLogged() {
        return VueCookies.isKey('token')
    },
    logout() {
        VueCookies.remove('token')
        store.state.user_data = null
    },
    login(token, callback = false) {
        axios.get('/personal/client-info', {
            'headers': {
                'X-Token': token
            }
        }).then((response) => {
            VueCookies.set('token', token)
            if (callback) callback(response, false)
        }).catch((error) => {
            if (callback) callback(error, true)
        })
    },
    getUserData() {
        axios.get('/personal/client-info', {
            'headers': {
                'X-Token': VueCookies.get('token')
            }
        }).then((response) => {
            store.state.user_data = response.data
        }).catch((error) => {
            window.console.log(error)
        })
    }
}
