<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "problems",
    props: ['contestInfo'],
    methods: {
        changePage(row, column, event) {
            let showID = ''
            window.localStorage.setItem('contestProblemId', row.pid)
            for (let i = 0; i < this.contestInfo.problems.length; i++) {
                if (this.contestInfo.problems[i].id === row.id) {
                    showID = String.fromCharCode(65 + i)
                    this.$router.push({
                        name: 'contestProblemDescription',
                        params: {
                            cid: this.$route.params.cid,
                            sid: showID
                        }
                    })
                }
            }
        }
    }
})
</script>

<template>
    <el-table :data="contestInfo.problems" @row-click="changePage" style="cursor:pointer;">
        <el-table-column prop="id" width="80" align="center">
            <template #default="slot">
                {{ String.fromCharCode(65 + slot.$index) }}
            </template>
        </el-table-column>
        <el-table-column label="title" prop="title"></el-table-column>
        <el-table-column label="AC Rate" prop="status" width="150">
            <template #default="slot">
                <el-text>
                    {{ slot.row.ac_count }} / {{ slot.row.submission_count }}({{ slot.row.ac_rate.toFixed(2) }}%)
                </el-text>
                <el-progress :percentage="slot.row.ac_rate.toFixed(2)" :show-text="false"></el-progress>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped lang="scss">

</style>
