<script>
import {defineComponent} from 'vue'
import {Grid, HomeFilled} from "@element-plus/icons-vue";

export default defineComponent({
    name: "main-page-header",
    components: {Grid, HomeFilled}
})
</script>
<script setup>
import {List} from "@element-plus/icons-vue";

let activeIndex = '/' + window.location.pathname.slice(1).split('/')[0]
</script>
<template>
    <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            :ellipsis="false"
            background-color="#fff"
            active-text-color="rgb(0, 97, 174)"
            :router="true"
            style="box-shadow: 0 0 5px #aaa"
    >
        <el-menu-item class="logo">
            <el-image src="http://oss.py00.cn/oj/sdufeacm.jpg"
                      style="height: 40px;padding-top: 10px;"
            ></el-image>
        </el-menu-item>
        <div style="flex: 1;"></div>
        <el-menu-item index="/home">
            <el-icon>
                <HomeFilled/>
            </el-icon>
            Home
        </el-menu-item>
        <el-menu-item index="/problems">
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
        <div style="padding: 0 5px;"></div>
    </el-menu>
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
</style>