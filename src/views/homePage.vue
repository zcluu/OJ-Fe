<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "indexPage"
})
</script>

<script setup>
import RecentAnnouncement from "@/components/homePage/recentAnnouncement.vue";
import RecentContests from "@/components/homePage/recentContests.vue";

let carouselItems = [
    'http://oss.py00.cn/oj/bs1.jpg',
    'http://oss.py00.cn/oj/bs2.jpg',
    'http://oss.py00.cn/oj/icpc13.jpg',
    'http://oss.py00.cn/oj/lqb.jpg',
    'http://oss.py00.cn/oj/lqb14.png'
]
</script>

<template>
    <div style="width: 60%;margin: 0 auto;">
        <h3>欢迎访问山东财经大学在线判题系统——SDUFE Online Judge</h3>
        <div class="line" style="margin: 20px 0;"></div>
            <recent-announcement/>
            <recent-contests/>
    </div>
</template>

<style scoped lang="scss">
</style>