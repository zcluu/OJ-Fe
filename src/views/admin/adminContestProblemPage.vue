<script>
import {defineComponent} from 'vue'
import {Delete, Edit, Hide, View} from "@element-plus/icons-vue";
import {encryptData} from '@/AES'

export default defineComponent({
    name: "adminProblemPage",
    computed: {
        Hide() {
            return Hide
        },
        View() {
            return View
        }
    },
    components: {Delete, Edit, View},
    data() {
        return {
            items: [],
            tableLoading: false,
        }
    },
    created() {
        this.getPage()
    },
    methods: {
        getPage() {
            this.items = []
            this.tableLoading = true
            this.$axios.get('/admin/contest/problem', {
                params: {
                    cid: this.$route.params.cid
                }
            }).then(res => {
                this.items = res.data
                this.tableLoading = false
            })
        },
        createProblem() {
            this.$router.push({
                name: 'adminContestProblemAdd',
                params: {
                    cid: this.$route.params.cid
                }
            })
        },
        changePage(page) {
            this.$router.push({
                name: 'adminContestProblemAll',
                params: {
                    pid: page,
                    cid: this.$route.params.cid
                }
            })
            this.page_num = page
            this.getPage()
        },
        editProblem(r) {
            this.$router.push({
                name: 'adminProblemEdit',
                params: {
                    pid: r.id
                }
            })
        },
        deleteProblem(r) {
            this.$axios.delete('/admin/problem', {
                params: {pid: r.id}
            }).then(res => {
                if (res.data) {
                    this.$notice.success('Delete successfully!')
                    this.getPage()
                }
            })
        },
        changeVisible(row) {
            this.$axios.get('/admin/problem/visible', {
                params: {pid: encryptData(row.id)}
            }).then(res => {

            })
        }
    }
})
</script>
<template>
    <keep-alive>
        <div style="">
            <el-button type="primary"
                       style="margin-bottom: 10px;"
                       @click="createProblem"
            >Create Problem
            </el-button>
            <el-table
                    v-loading="tableLoading"
                    :data="items">
                <el-table-column label="ID" width="100" type="index"></el-table-column>
                <el-table-column label="Title" prop="title"></el-table-column>
                <el-table-column label="Author" prop="author" width="150"></el-table-column>
                <el-table-column label="Create Time" prop="" width="150">
                    <template #default="slot">
                        {{ $formatDate(slot.row.create_time) }}
                    </template>
                </el-table-column>
                <el-table-column label="Visible" prop="" width="150" align="center">
                    <template #default="slot">
                        <el-tooltip :content="slot.row.status?'Hide this problem':'Display this problem'">
                            <el-switch v-model="slot.row.status"
                                       @change="changeVisible(slot.row)"
                                       active-color="rgb(0, 97, 174)"
                            ></el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="Operation" width="150" align="center">
                    <template #default="slot">
                        <el-tooltip content="Edit problem">
                            <el-button plain
                                       @click="editProblem(slot.row)"
                                       size="small">
                                <el-icon>
                                    <Edit/>
                                </el-icon>
                            </el-button>
                        </el-tooltip>
                        <el-tooltip content="Delete problem">
                            <el-button plain
                                       @click="deleteProblem(slot.row)"
                                       size="small">
                                <el-icon>
                                    <Delete/>
                                </el-icon>
                            </el-button>
                        </el-tooltip>
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
