/*
 * @Autor: eobeans
 * @Date: 2021-06-06 15:51:46
 * @LastEditors: eobeans
 * @LastEditTime: 2021-06-06 15:52:15
 * @Version: 0.1.0
 * @Description: 
 */
import axios from "axios";

const server = axios.create({
    baseURL: '/api',
    timeout: 5000
})

server.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

export default server