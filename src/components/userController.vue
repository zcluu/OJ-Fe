<script>
import {defineComponent} from 'vue'
import {Search} from "@element-plus/icons-vue";

export default defineComponent({
    name: "userController",
    components: {Search}
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
            <el-link href="login" class="hidden" :underline="false">
                登录
            </el-link>
            <el-link href="register" class="hidden" :underline="false">
                注册
            </el-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
    background-color: #dedede;
    color: #fff;

    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
  }

  &:hover {
    width: 120px;
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