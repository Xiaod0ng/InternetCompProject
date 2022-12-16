import axios from 'axios'
import {
    ElMessage
} from "element-plus";

const service = axios.create({
    baseURL: '/api',
    // set timeout
    timeout: 3000
})
service.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/json' // request header
        }
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)
service.interceptors.response.use(
    // success
    response => {
        const res = response.data
        if (res.code == 0) {
             const res2 = {
                code: res.code,
                data: JSON.parse(JSON.stringify(res.data)),
                msg: res.msg
            }
            return res2
        }
    },
    error => {
        // Message.error(error.message)
        if (JSON.stringify(error).includes('timeout')) {
            ElMessage({
                message: "Timeout. Please refresh.",
                type: "error",
            });
        }
    }
)
export default service