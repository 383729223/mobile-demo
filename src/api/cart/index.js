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
    }

}

export default api