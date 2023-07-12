<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "contestPage",
    data() {
        return {
            items: [],
            page_size: 20,
            page_num: 1,
            total: 1,
            pages: 1,
            tableLoading: false,
        }
    },
    mounted() {
        this.page_num = this.$route.params.pid ? this.$route.params.pid : this.page_num
        this.getPage()
    },
    methods: {
        getPage() {
            this.items = []
            this.tableLoading = true
            this.$axios.get('/contest/all', {params: {size: this.page_size, page: this.page_num}}).then(res => {
                this.items = res.data.items
                this.tableLoading = false
                this.page_size = res.data.size
                this.page_num = res.data.page
                this.total = res.data.total
                this.pages = res.data.pages
            })
        },
        changePage(page) {
            this.$router.push({
                name: 'contest',
                params: {
                    pid: page
                }
            })
            this.page_num = page
            this.getPage()
        },
        getContestDetail(r, c, e) {
            this.$router.push({
                name: 'contestDescription',
                params: {
                    cid: r.id
                }
            })
        }
    }
})
</script>

<script setup>
</script>

<template>
    <div style="width: 60%;margin:0 auto;">
        <el-table
                @row-click="getContestDetail"
                v-loading="tableLoading"
                :data="items"
                style="cursor: pointer;"
        >
            <el-table-column label="ID" width="100" prop="id"></el-table-column>
            <el-table-column label="Title" prop="title"></el-table-column>
        </el-table>
        <el-pagination
                style="margin-top: 20px;"
                v-model:current-page="page_num"
                :hide-on-single-page="false"
                :page-size="page_size"
                layout="prev, pager, next"
                :page-count="pages"
                @current-change="changePage"
        ></el-pagination>
    </div>
</template>

<style scoped>

</style>
