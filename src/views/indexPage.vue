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
    <el-container>
        <el-header class="no-padding">
            <main-page-header/>
        </el-header>
        <el-main id="mainContainer" style="min-height: calc(100vh - 236px);background-color: var(--index-bg-color);">
            <router-view></router-view>
        </el-main>
        <el-footer class="no-padding" height="auto">
            <index-page-footer></index-page-footer>
        </el-footer>
    </el-container>
</template>

<style scoped>

</style>