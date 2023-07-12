<script>
import {defineComponent} from 'vue'
import IndexPageFooter from "@/components/indexPage/index-page-footer.vue";
import MainPageHeader from "@/components/adminPage/admin-page-header.vue";

export default defineComponent({
    name: "adminPage",
    components: {MainPageHeader, IndexPageFooter}
})
</script>

<template>
    <el-container>
        <el-header class="no-padding">
            <main-page-header/>
        </el-header>
        <router-view></router-view>
        <el-footer class="no-padding" height="auto">
            <index-page-footer></index-page-footer>
        </el-footer>
    </el-container>
</template>

<style scoped lang="scss">

</style>
