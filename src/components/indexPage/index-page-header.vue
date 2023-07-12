<script>
import {defineComponent} from 'vue'
import {Grid, HomeFilled} from "@element-plus/icons-vue";
import bus from "@/event";

export default defineComponent({
    name: "main-page-header",
    components: {Grid, HomeFilled},
    data() {
        return {
            is_dark: false,
            activeIndex: ''
        }
    },
    created() {
        if (localStorage.getItem('is_dark') === 'true') {
            this.is_dark = true
            document.getElementsByTagName('html')[0].className = 'dark'
        }
        this.activeIndex = '/' + window.location.href.replace(window.location.origin, '').slice(3).split('/')[0]
        bus.on('changeHeaderIndex', (index) => {
            console.log(index)
            this.activeIndex = index
        })
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
import {BellFilled, List, Moon, Sunny} from "@element-plus/icons-vue";
import UserController from "@/components/userController.vue";


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
                <!--                <el-image src="http://oss.py00.cn/oj/sdufeacm2.png"-->
                <!--                          style="height: 40px;padding-top: 10px;"-->
                <!--                ></el-image>-->
                <h1>SDUFE Online Judge</h1>
            </el-menu-item>
            <div style="flex: 1;"></div>
            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled/>
                </el-icon>
                Home
            </el-menu-item>
            <el-menu-item index="/problem">
                <el-icon>
                    <Grid/>
                </el-icon>
                Problems
            </el-menu-item>
            <el-menu-item index="/contest">
                <el-icon>
                    <List/>
                </el-icon>
                Contests
            </el-menu-item>
            <el-menu-item index="/announcement">
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
            <!--            <el-switch-->
            <!--                    v-model="is_dark"-->
            <!--                    style="margin-left: 24px"-->
            <!--                    inline-prompt-->
            <!--                    :active-icon="Sunny"-->
            <!--                    :inactive-icon="Moon"-->
            <!--            />-->
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
