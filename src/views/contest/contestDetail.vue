<script>
import {defineComponent} from 'vue'
import {ContestStatus} from "@/constants";

export default defineComponent({
    name: "contestDetail",
    computed: {
        ContestStatus() {
            return ContestStatus
        },
    },
    data() {
        return {
            activeName: '',
            contestInfo: {
                title: '',
                start_at: '',
                end_at: '',
                status: ''
            },
            bottomCardHeight: ''
        }
    },
    created() {
        this.activeName = this.$route.name
        this.$axios.get('/contest/detail', {params: {contest_id: this.$route.params.cid}}).then(res => {
            this.contestInfo = res.data
        })
    },
    methods: {
        changePage(name) {
            this.$router.push({
                name: name,
                params: {
                    cid: this.$route.params.cid
                }
            })
        }
    }
})
</script>

<template>
    <el-card class="menu" shadow="never">
        <el-menu :default-active="activeName">
            <el-menu-item index="contestDescription" @click="changePage('contestDescription')">Overview
            </el-menu-item>
            <el-menu-item index="contestProblems" @click="changePage('contestProblems')">Problems</el-menu-item>
            <el-menu-item index="contestRank" @click="changePage('contestRank')">Ranklist</el-menu-item>
            <el-menu-item index="contestAnnouncements" @click="changePage('contestAnnouncements')">Announcements
            </el-menu-item>
        </el-menu>
    </el-card>
    <router-view :contestInfo="contestInfo" v-slot="{ Component, route }"></router-view>
</template>

<style scoped lang="scss">
.menu {
  position: fixed;
  width: 150px;
  padding: 0;
  right: 30px;
  --el-card-padding: 0;

  .el-menu {
    border: none;
    text-align: center;

    .el-menu-item {
      justify-content: center;
    }
  }
}
</style>
