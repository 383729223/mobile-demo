import api from '@/api/cart'
import axios from 'axios'

const store = {
    state: { // 存放当前页面的状态
        cartlist: [],
        detailMsg: []
    },
    getters: { // 状态的衍生值，其实就是state中的计算属性
        totalPrice(state) {
            return state.cartlist.reduce((sum, item) => {
                if (item[0].flag) {
                    return sum + item[0].buyCount * item[0].discount_price
                } else {
                    return sum
                }
            }, 0)
        },
        totalNum(state) {
            return state.cartlist.reduce((sum, item) => {
                // if (item[0].flag) {
                //     return sum + item[0].num
                // } else {
                //     return sum
                // }
                return item[0].buyCount
            }, 0)
        }
    },
    actions: { // 处理组件中的异步操作
        requestCartData(context, id) {
            return new Promise((resolve, reject) => {
                api.requestData('http://39.98.41.185/api/product/search?id=' + id).then(data => {
                    // console.log('cartStore', data)
                    resolve(data)
                }).catch(err => reject(err))
            })
        },
        // 添加、修改购物车数据POST接口,存进数据库
        requestStorageData(context, url, parms) {
            return new Promise((resolve, reject) => {
                axios.post(url, parms)
                    .then((data) => {
                        resolve(data.data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    });

            })
        },
        // 查询购物车数据接口
        requestGetCartData(context) {
            return new Promise((resolve, reject) => {
                axios.get('http://39.98.41.185/api/cart?pageNumber=200')
                    .then((data) => {
                        console.log('getCartData', data)
                        resolve(data.data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    });

            })
        }
    },
    mutations: { // 唯一改变当前页面的状态的地方
        changeCartList(state, data) {
            state.cartlist = data
        },
        changeDeatailMsg(state, data) {
            state.detailMsg.push(data)
            state.isflag = true
        },
        changeCount(state, data) {

        }
    }
}

export default store