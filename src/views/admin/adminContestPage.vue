<script>
import {defineComponent} from 'vue'
import {Delete, Edit, Hide, View} from "@element-plus/icons-vue";
import {encryptData} from '@/AES'

export default defineComponent({
    name: "adminContestPage",
    data() {
        return {
            height: ''
        }
    },
    mounted() {
        this.height = window.innerHeight - this.$getheight.class('el-header') - this.$getheight.class('el-footer')
    }
})
</script>
<script setup>
import {BellFilled, List, Moon, Plus, Sunny} from "@element-plus/icons-vue";
import UserController from "@/components/userController.vue";

let activeIndex = '/admin/' + window.location.pathname.slice(1).split('/')[1] + '/' + window.location.pathname.slice(1).split('/')[2]
console.log(activeIndex)
</script>
<template>
    <el-container>
        <el-aside>
            <el-menu
                    :default-active="activeIndex"
                    :ellipsis="false"
                    active-text-color="rgb(0, 97, 174)"
                    :router="true"
                    style="height: 100%;">
                <el-menu-item index="/admin/contest/all">
                    <el-icon>
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             p-id="4125">
                            <path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m0 73.142857H195.047619v219.428571h219.428571V195.047619z m73.142858 341.333333v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429zM195.047619 609.52381v219.428571h219.428571v-219.428571H195.047619zM719.238095 121.904762a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286z m0 73.142857a109.714286 109.714286 0 1 0 0 219.428571 109.714286 109.714286 0 0 0 0-219.428571zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z m-219.428571 292.571429h219.428571v-219.428571h-219.428571v219.428571z"
                                  p-id="4126"></path>
                        </svg>
                    </el-icon>
                    Contest List
                </el-menu-item>
                <el-menu-item index="/admin/contest/add">
                    <el-icon>
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             p-id="2662">
                            <path d="M548.571429 170.666667v304.761904H853.333333v73.142858H548.547048L548.571429 853.333333h-73.142858l-0.024381-304.761904H170.666667v-73.142858h304.761904V170.666667h73.142858z"
                                  p-id="2663"></path>
                        </svg>
                    </el-icon>
                    Create Contest
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main style="background-color: var(--index-bg-color);" :style="{minHeight:height+'px'}">
            <el-scrollbar :height="(height-40)+'px'">
                <router-view/>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>

<style scoped>

</style>
