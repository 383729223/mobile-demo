import axios from 'axios'

const store = {
    state: { // 存放当前页面的状态
        loginState: false
    },
    getters: { // 状态的衍生值，其实就是state中的计算属性

    },
    actions: { // 处理组件中的异步操作
        requestLoginStateData(context, phone, password) {
            return new Promise((resolve, reject) => {
                axios.post('https://www.daxunxun.com/users/login', {
                    username: phone,
                    password: password
                }).then((data) => {
                    console.log(data)
                    resolve(data.data)
                }).catch((error) => {
                    reject(error)
                });
            })
        }
    },
    mutations: { // 唯一改变当前页面的状态的地方

        changeLoginState(state, data) {
            state.loginState = data
        }
    }
}

export default store