<script>
import {defineComponent} from 'vue'
import {Search} from "@element-plus/icons-vue";
import LoginPage from "@/views/user/loginPage.vue";
import RegisterPage from "@/views/user/registerPage.vue";

export default defineComponent({
    name: "userController",
    components: {RegisterPage, LoginPage, Search},
    data() {
        return {
            loginDialog: false,
            registerDialog: false,
        }
    }
})
</script>

<template>
    <div class="outer-box">
        <div class="inner-box">
            <el-avatar
                    style="background-color: transparent;"
                    src="http://oss.py00.cn/blog/avatar.png"
                    :size="30"
            ></el-avatar>
            <el-text class="hidden link-btn" @click="loginDialog = true">
                登录
            </el-text>
            <el-text class="hidden link-btn" @click="registerDialog = true">
                注册
            </el-text>
        </div>
    </div>
    <el-dialog v-model="loginDialog"
               :show-close="false"
               width="30%"
               class="control-dialog">
        <login-page/>
    </el-dialog>
    <el-dialog v-model="registerDialog"
               :show-close="false"
               width="30%"
               class="control-dialog">
        <register-page
                @registerSuccess="()=>{registerDialog=false,loginDialog=true}"
        />
    </el-dialog>
</template>

<style scoped lang="scss">

.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: var(--el-overlay-color-lighter);
  overflow: auto;
}

.outer-box {
  z-index: 999;
  position: absolute;
  right: 0;
  top: 80px;
  width: 40px;

  border-radius: 5px 0 0 5px;

  transition-duration: .3s;
  overflow: hidden;

  .inner-box {
    width: 120px;
    height: 40px;
    background-color: #fff;
      border: var(--el-border);
      overflow: hidden;

    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;

    cursor: pointer;
  }

  &:hover {
    width: 120px;
  }

  .link-btn {
    transition-duration: .3s;

    &:hover {
      color: var(--sdufe-color);
    }
  }
}

.main-box {
  z-index: 100;
  width: 120px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-radius: 5px 0 0 5px;
  background-color: #fafafa;
  height: 40px;
  transition-duration: .5s;
  box-shadow: 0 0 5px #ccc;

  position: absolute;
  right: -80px;
  top: 70px;

}
</style>
