import axios from 'axios'

const api = {
    requestData(id) {
        return new Promise((resolve, reject) => {
            axios.get('http://39.98.41.185/api/product/search?id=' + id)
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                });
        })
    }
}

export default api