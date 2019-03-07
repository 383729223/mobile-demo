import axios from 'axios'

const api = {
    requestData(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((data) => {
                    resolve(data.data.data)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    productList() {
        return new Promise((resolve, reject) => {
            axios.get('http://39.98.41.185/api/product')
                .then((data) => {
                    resolve(data.data.data)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    productBanner() {
        return new Promise((resolve, reject) => {
            axios.get('http://39.98.41.185/api/banner')
                .then((data) => {
                    resolve(data.data.data)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    },
    loadmore(pagecode) {
        return new Promise((resolve, reject) => {
            axios.get('http://39.98.41.185/api/product?pageCode=' + pagecode)
                .then((data) => {
                    resolve(data.data.data)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }



}

export default api