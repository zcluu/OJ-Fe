<script>
import {defineComponent} from 'vue'
import {Grid, HomeFilled} from "@element-plus/icons-vue";
import bus from "@/event";

export default defineComponent({
    name: "admin-page-header",
    components: {Grid, HomeFilled},
    data() {
        return {
            is_dark: false
        }
    },
    created() {
        if (localStorage.getItem('is_dark') === 'true') {
            this.is_dark = true
            document.getElementsByTagName('html')[0].className = 'dark'
        }
    },
    methods: {
        changeDark() {
            this.is_dark = !this.is_dark
            bus.emit('changeDark', this.is_dark)
            localStorage.setItem('is_dark', this.is_dark)
            this.$is_dark = this.is_dark
            if (this.is_dark) {
                document.getElementsByTagName('html')[0].className = 'dark'
            } else {
                document.getElementsByTagName('html')[0].className = ''
            }
        }
    }
})
</script>
<script setup>
import {BellFilled, List, Moon, Plus, Sunny} from "@element-plus/icons-vue";
import UserController from "@/components/userController.vue";

let activeIndex = '/admin/' + window.location.pathname.slice(1).split('/')[1]
console.log(activeIndex)
</script>
<template>
    <user-controller/>
    <el-affix>
        <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                :ellipsis="false"
                active-text-color="rgb(0, 97, 174)"
                :router="true"
                style="border-bottom-color: var(--el-border-color-light);background-color: var(--el-bg-color)"
        >
            <el-menu-item class="logo">
                <h1>SDUFE Online Judge</h1>
            </el-menu-item>
            <div style="flex: 1;"></div>
            <el-menu-item index="/admin/home">
                <el-icon>
                    <HomeFilled/>
                </el-icon>
                Overview
            </el-menu-item>
            <el-menu-item index="/admin/problem">
                <el-icon>
                    <Grid/>
                </el-icon>
                Problems
            </el-menu-item>
            <el-sub-menu>
                <template #title>Contests</template>
                <el-menu-item index="/admin/contest">
                    <el-icon>
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4125"><path d="M414.47619 121.904762a73.142857 73.142857 0 0 1 73.142858 73.142857v292.571429H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142858V195.047619a73.142857 73.142857 0 0 1 73.142857-73.142857h219.428571z m0 73.142857H195.047619v219.428571h219.428571V195.047619z m73.142858 341.333333v292.571429a73.142857 73.142857 0 0 1-73.142858 73.142857H195.047619a73.142857 73.142857 0 0 1-73.142857-73.142857v-219.428571a73.142857 73.142857 0 0 1 73.142857-73.142858h292.571429zM195.047619 609.52381v219.428571h219.428571v-219.428571H195.047619zM719.238095 121.904762a182.857143 182.857143 0 1 1 0 365.714286 182.857143 182.857143 0 0 1 0-365.714286z m0 73.142857a109.714286 109.714286 0 1 0 0 219.428571 109.714286 109.714286 0 0 0 0-219.428571zM828.952381 536.380952a73.142857 73.142857 0 0 1 73.142857 73.142858v219.428571a73.142857 73.142857 0 0 1-73.142857 73.142857h-219.428571a73.142857 73.142857 0 0 1-73.142858-73.142857V536.380952h292.571429z m-219.428571 292.571429h219.428571v-219.428571h-219.428571v219.428571z" p-id="4126"></path></svg>
                    </el-icon>
                    All contest
                </el-menu-item>
                <el-menu-item index="/admin/contest/add">
                    <el-icon>
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2662"><path d="M548.571429 170.666667v304.761904H853.333333v73.142858H548.547048L548.571429 853.333333h-73.142858l-0.024381-304.761904H170.666667v-73.142858h304.761904V170.666667h73.142858z" p-id="2663"></path></svg>
                    </el-icon>
                    Create contest
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/admin/announcement">
                <el-icon>
                    <BellFilled/>
                </el-icon>
                Announcements
            </el-menu-item>
            <div class="switch-item">
                <button class="switch" @click="changeDark">
                    <div class="switch_action">
                        <el-icon size="13px">
                            <Sunny v-if="!is_dark"/>
                            <Moon v-else/>
                        </el-icon>
                    </div>
                </button>
            </div>
            <div style="padding: 0 5px;"></div>
        </el-menu>
    </el-affix>
</template>

<style scoped lang="scss">
.el-menu-item {
  --el-menu-hover-text-color: var(--sdufe-color);
  --el-menu-hover-bg-color: #ffffff;

  &:focus {
    background-color: transparent !important;
    border-bottom-color: var(--sdufe-color);
  }

  &:hover {
    background-color: transparent !important;
    border-bottom-color: var(--sdufe-color);
    cursor: pointer;
  }
}

.logo {
  &:hover {
    background-color: transparent !important;
    border-bottom-color: transparent;
    cursor: default;
  }
}

.switch-item {
  height: calc(var(--el-header-height) - 2px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid var(--el-border-color);
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: var(--el-bg-color);
  cursor: pointer;
  transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration);

  .switch_action {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 14px;
    border-radius: 50%;
    background-color: var(--el-bg-color);
    transform: translate(0);
    color: var(--text-color-light);
    transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration), transform var(--el-transition-duration);
  }
}

.dark .switch_action {
  transform: translate(20px);
}
</style>
