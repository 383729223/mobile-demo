import api from '@/api/home'
import axios from 'axios'

const store = {
    state: { // 存放当前页面的状态
        bannerdata: [
            'http://www.uqmei.com/image/cache/catalog/500X230/15245466602817-500x230.jpg',
            'http://www.uqmei.com/image/cache/catalog/500X230/15245508258489-500x230.jpg',
            'http://www.uqmei.com/image/cache/catalog/mobile-home/Hotel_Categoey/top_image/15289433152979-500x230.jpg'
        ],
        lists: [],
        commonId: 0

    },
    getters: { // 状态的衍生值，其实就是state中的计算属性

    },
    actions: { // 处理组件中的异步操作
        requestListData(context) {
            api.requestData('http://39.98.41.185/api/product').then(data => {
                // console.log(data)
                context.commit('changeProList', data)
            })
        },
        loadMoreData(context, pagecode) {
            // console.log('1111111111111', context)
            // 加载更多数据
            return new Promise((resolve, reject) => {
                axios.get('http://39.98.41.185/api/product?pageCode=' + pagecode)
                    .then((data) => {
                        // console.log(data.data.data)
                        resolve(data.data.data)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            })
        },

    },
    mutations: { // 唯一改变当前页面的状态的地方
        changeBannerData(state, data) { // state就是{bannerdata:[], prolist" []}
            state.bannerdata = data // 改变状态管理器中的数据
        },
        changeProList(state, data) {
            // console.log(data)
            state.commonId = data[0]._id
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