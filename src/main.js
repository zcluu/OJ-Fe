import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";
import ElementPlus, {ElMessage} from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/dark.css'
import './assets/main.css'

const app = createApp(App)
if (process.env.NODE_ENV === 'development') {
        axios.defaults.baseURL = 'http://127.0.0.1:8808/api'
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
        config.headers['x-token'] = localStorage.getItem('token');
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
axios.interceptors.response.use(
    res => {
        if (res.data.status === 200 || res.status === 200) {
            return res
        }
        if (res.data.status === 401 || res.status === 401) {
            ElMessage.error(res.data.msg || '登录状态失效，请重新登录')
            router.push('/')
        } else {
            if (res.data.msg) {
                NoticeMSG.error(res.data.msg)
            } else if (res.data) {
                NoticeMSG.error(res.data)
            } else {
                NoticeMSG.error('Request is rejected!')
            }
        }
        return res;
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                NoticeMSG.error(error.response.data.msg || 'Session is expired or invalid, please login')
                router.push('/')
            } else {
                NoticeMSG.error(error.response.data.msg || 'System error, please contact the administrator')
            }
        } else {
            NoticeMSG.error('Request is rejected')
            return Promise.reject(error);
        }
    },
);

let formatDate = (date) => {
    let da = new Date(date)
    return da.getFullYear() + '-' + (da.getMonth() + 1).toString().padStart(2, '0') + '-' + da.getDate().toString().padStart(2, '0') + ' ' + da.getHours().toString().padStart(2, '0') + ':' + da.getMinutes().toString().padStart(2, '0')
}

let getTagHeight = {
    class: (name) => {
        return document.getElementsByClassName(name)[0].offsetHeight
    },
    id: (name) => {
        return document.getElementById(name).offsetHeight
    },
    query: (name) => {
        return document.querySelector(name).offsetHeight
    }
}

app.config.globalProperties.$is_dark = false
app.config.globalProperties.$axios = axios
app.config.globalProperties.$formatDate = formatDate
app.config.globalProperties.$getheight = getTagHeight
app.config.globalProperties.$notice = NoticeMSG
app.use(router)
app.use(ElementPlus)

app.mount('#app')
