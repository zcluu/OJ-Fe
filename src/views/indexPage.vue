<script>
import {defineComponent} from 'vue'
import MainPageHeader from "@/components/indexPage/index-page-header.vue";
import {User} from "@element-plus/icons-vue";
import UserController from "@/components/userController.vue";
import IndexPageFooter from "@/components/indexPage/index-page-footer.vue";

export default defineComponent({
    name: "indexPage",
    components: {IndexPageFooter, UserController, User, MainPageHeader}
})
</script>

<template>
    <user-controller/>
    <el-container>
        <el-header class="no-padding" style="background-color: rgb(246,247,249);">
            <main-page-header/>
        </el-header>
        <el-main id="mainContainer" style="min-height: calc(100vh - 236px);background-color: rgb(247,248,250);">
            <router-view></router-view>
        </el-main>
        <el-footer class="no-padding" height="auto">
            <index-page-footer></index-page-footer>
        </el-footer>
    </el-container>
</template>

<style scoped>

</style>