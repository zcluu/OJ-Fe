<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "problemPage",
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
            this.$axios.get('/problem/all', {params: {size: this.page_size, page: this.page_num}}).then(res => {
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
                name: 'problems',
                params: {
                    pid: page
                }
            })
            this.page_num = page
            this.getPage()
        }
    }
})
</script>
<template>
    <keep-alive>
        <div style="width: 60%;margin:0 auto;">
            <el-table
                    v-loading="tableLoading"
                    :data="items">
                <el-table-column label="ID" width="100">
                    <template #default="slot">
                        <el-link
                                :href="'/problem/detail/'+slot.row.id"
                                :underline="false">{{ slot.row.id }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="Title" prop="title">
                    <template #default="slot">
                        <el-link
                                :href="'/problem/detail/'+slot.row.id"
                                :underline="false">{{ slot.row.title }}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="AC Rate" prop="status" width="150">
                    <template #default="slot">
                        <el-text>
                            {{ slot.row.ac_count }} / {{ slot.row.submission }}({{ slot.row.ac_rate.toFixed(2) }}%)
                        </el-text>
                        <el-progress :percentage="slot.row.ac_rate.toFixed(2)" :show-text="false"></el-progress>
                    </template>
                </el-table-column>
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
    </keep-alive>
</template>

<style scoped>

</style>
