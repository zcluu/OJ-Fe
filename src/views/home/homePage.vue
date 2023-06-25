<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "indexPage"
})
</script>

<script setup>
import RecentAnnouncement from "@/components/homePage/recentAnnouncement.vue";
import RecentContests from "@/components/homePage/recentContests.vue";
import HotProblems from "@/components/homePage/hotProblems.vue";

let carouselItems = [
    'http://oss.py00.cn/oj/bs1.jpg',
    'http://oss.py00.cn/oj/bs2.jpg',
    'http://oss.py00.cn/oj/icpc13.jpg',
    'http://oss.py00.cn/oj/lqb.jpg',
    'http://oss.py00.cn/oj/lqb14.png'
]
</script>

<template>
    <div style="width: 90%;margin: 0 auto;">
        <h3>欢迎访问山东财经大学在线判题系统——SDUFE Online Judge</h3>
        <div class="line" style="margin: 20px 0;"></div>
        <el-row :gutter="20">
            <el-col :span="8">
                <recent-announcement/>
            </el-col>
            <el-col :span="16">
                <recent-contests/>
                <hot-problems/>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
</style>