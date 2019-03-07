import api from '@/api/kind'
import axios from 'axios'

const store = {
    state: { // 存放当前页面的状态
        lists: [],
        commonId: 0
    },
    getters: { // 状态的衍生值，其实就是state中的计算属性

    },
    actions: { // 处理组件中的异步操作
        requestListData(context) {
            api.requestData('http://39.98.41.185/api/product').then(data => {
                context.commit('changeProList', data)
            })
        },
        requestSortUpData(context) {
            // 加载更多数据
            return new Promise((resolve, reject) => {
                axios.get(`http://39.98.41.185/api/product/sort?num=1&type=original_price`)
                    .then((data) => {
                        // console.log(data)
                        resolve(data.data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            })
        },
        requestSortDownData(context) {
            // 加载更多数据
            return new Promise((resolve, reject) => {
                axios.get(`http://39.98.41.185/api/product/sort?num=-1&type=original_price`)
                    .then((data) => {
                        resolve(data.data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            })
        },
        loadMoreData(context, pagecode) {
            // 加载更多数据
            return new Promise((resolve, reject) => {
                axios.get('http://39.98.41.185/api/product?pageCode=' + pagecode)
                    .then((data) => {
                        resolve(data.data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            })
        },
    },
    mutations: { // 唯一改变当前页面的状态的地方
        changeProList(state, data) {
            state.lists = data
        },
        changemorelist(state, data) {
            // console.log('1111', state.commonId)
            // console.log('2222', data)
            if (state.commonId !== data[0]._id) {
                state.lists = [...state.lists, ...data]
            } else {
                // console.log('重复数据')
            }
        }

    }
}

export default store