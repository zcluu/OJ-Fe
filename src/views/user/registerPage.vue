<template>
    <el-card style="margin: 0 auto;">
        <template #header>
            <h3>Welcome to SDUFE Online Judge</h3>
        </template>
        <el-form label-position="top" :rules="rules" :model="userLoginForm" status-icon>
            <el-form-item label="Username" prop="username">
                <el-input v-model:model-value="userLoginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model:model-value="userLoginForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model:model-value="userLoginForm.password" type="password"
                          show-password></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirmPassword">
                <el-input v-model:model-value="userLoginForm.confirmPassword" type="password"
                          show-password></el-input>
            </el-form-item>
            <el-form-item label="Verification Code">
                <el-row style="width: 100%;">
                    <el-col :span="16">
                        <el-input v-model:model-value="userLoginForm.code"
                                  :data="identifyCode"
                        ></el-input>
                    </el-col>
                    <el-col :span="8" style="display:flex;justify-content: center;">
                        <randomCode @click="refreshCode" :identify-code="identifyCode"
                                    content-height="35"
                                    content-width="100"
                        ></randomCode>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-button style="width: 100%;" type="primary" plain @click="handleLogin">Register</el-button>
        </el-form>
    </el-card>
</template>

<script>
import RandomCode from "@/components/randomCode.vue";
import {ElMessage} from "element-plus";

export default {
    name: "registerPage",
    components: {RandomCode},
    data() {
        let validatePassword = (rule, value, callback) => {
            if (value === '' || !value) {
                callback(new Error('Please input password'))
            } else if (!this.regularPassword(value)) {
                callback(new Error('Require a length of 6 to 32 and cannot contain&<>"\''))
            } else {
                callback()
            }
        }
        let validateEmail = (rule, value, callback) => {
            if (value === '' || !value) {
                callback(new Error('Please input email'))
            } else if (!this.regularEmail(value)) {
                callback(new Error('Please input valid email address'))
            } else {
                callback()
            }
        }
        let validateUsername = (rule, value, callback) => {
            if (value === '' || !value) {
                callback(new Error('Please input username'))
            } else if (value.length > 16 || value.length < 5) {
                callback(new Error('Require a length of 5 to 16'))
            } else if (!this.regularUsername(value, 0)) {
                callback(new Error('Start with a letter'))
            } else if (!this.regularUsername(value, 1)) {
                callback(new Error('Only allow contain letters,numbers and _'))
            } else {
                callback()
            }
        }
        return {
            identifyCode: "",
            identifyCodes: '123456789abcdwerwshdjeJKDHRJHKPLMKQ',
            userLoginForm: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                code: ''
            },
            rules: {
                username: [
                    {validator: validateUsername, trigger: 'blur'}
                ],
                email: [
                    {validator: validateEmail, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePassword, trigger: 'blur'}
                ],
                confirmPassword: [
                    {validator: validatePassword, trigger: 'blur'}
                ],
            },
        }
    },
    mounted() {
        this.refreshCode()
    },
    methods: {
        refreshCode() {
            this.identifyCode = ''
            this.makeCode(this.identifyCodes, 4)
        },
        randomNum(min, max) {
            max = max + 1
            return Math.floor(Math.random() * (max - min) + min)
        },
        makeCode(data, len) {
            for (let i = 0; i < len; i++) {
                this.identifyCode += data[this.randomNum(0, data.length - 1)]
            }
        },
        handleLogin() {
            if (this.userLoginForm.code.toUpperCase() !== this.identifyCode.toUpperCase()) {
                this.$notice.error('Wrong Verification Code!')
            } else {
                this.$axios.post('/user/register', this.userLoginForm).then(res => {
                    if (res.status === 200) {
                        this.$notice.success('Register Successfully!')
                        this.$emit('registerSuccess')
                    }
                })
            }
        },
        regularPassword(val) {
            return /^(?!.*[&<>"'\n\r]).{6,32}$/.test(val)
        },
        regularEmail(val) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)
        },
        regularUsername(val, mode) {
            if (mode === 0) return /^[a-zA-Z].*/.test(val)
            return /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(val)
        },
    }

}
</script>

<style scoped>

</style>
