import Vue from 'vue'
import VueX from 'vuex'
import kindStore from './kind'
import cartStore from './cart'
import homeStore from './home'
import loginRegisterStore from './loginRegister'

Vue.use(VueX)

const store = new VueX.Store({
    modules: {
        kindStore,
        cartStore,
        homeStore,
        loginRegisterStore
    }
})

export default store