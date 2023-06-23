import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/main.css'

const app = createApp(App)
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
} else {
    axios.defaults.baseURL = '/api'
}


let NoticeMSG = {
    error: (msg) => {
        ElMessage.error({message: msg})
    },
    success: (msg) => {
        ElMessage.success({message: msg})
    },
    warning: (msg) => {
        ElMessage.warning({message: msg})
    },
}

axios.interceptors.request.use(
    config => {
        config.headers.token = localStorage.getItem('token');
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
axios.interceptors.response.use(
    res => {
        if (res.data.status === 401) {
            ElMessage.error(res.data.msg || '登录状态失效，请重新登录')
            router.push('/')
        }
        return res;
    },
    error => {
        if (error.response.status === 401) {
            NoticeMSG.error(error.response.data.msg || '登录状态失效，请重新登录')
            router.push('/')
        } else {
            if (error.response.data.msg) {
                NoticeMSG.error(error.response.data.msg)
            }
            return Promise.reject(error);
        }
    },
);


app.config.globalProperties.$axios = axios
app.config.globalProperties.$notice = NoticeMSG
app.use(router)
app.use(ElementPlus)

app.mount('#app')
