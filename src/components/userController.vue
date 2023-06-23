<script>
import {defineComponent} from 'vue'
import {Search} from "@element-plus/icons-vue";

export default defineComponent({
    name: "userController",
    components: {Search}
})
</script>

<template>
    <div class="main-box">
        <el-link href="login" :underline="false">
            登录
        </el-link>
        <el-link href="register" :underline="false">
            注册
        </el-link>
        <a href="#">
            <el-avatar
                    style="background-color: #fff;"
                    src="http://oss.py00.cn/blog/avatar.png"
                    :size="30"
            ></el-avatar>
        </a>
    </div>

</template>

<style scoped lang="scss">
.main-box {
  width: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-radius: 0 0 0 5px;
  background-color: rgba(204, 204, 204, 0.37);
  height: 40px;

    position: absolute;
    right: 0;
    top: 58px;
}
</style>