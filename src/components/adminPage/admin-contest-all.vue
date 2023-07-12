<script>
import {defineComponent} from 'vue'
import {Delete, Edit, Help, Hide, View} from "@element-plus/icons-vue";
import {encryptData} from "@/AES";
import {ContestStatus, ContestStatusLabel} from "@/constants";

export default defineComponent({
    name: "admin-contest-all",

    computed: {
        ContestStatusLabel() {
            return ContestStatusLabel
        },
        ContestStatus() {
            return ContestStatus
        },
        Hide() {
            return Hide
        },
        View() {
            return View
        }
    },
    components: {Help, Delete, Edit, View},
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
            this.$axios.get('/admin/contest/all', {params: {size: this.page_size, page: this.page_num}}).then(res => {
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
                name: 'adminContest',
                params: {
                    pid: page
                }
            })
            this.page_num = page
            this.getPage()
        },
        editContest(r) {
            this.$router.push({
                name: 'adminContestEdit',
                params: {
                    cid: encryptData(r.id)
                }
            })
        },
        deleteContest(r) {
            this.$axios.delete('/admin/contest', {
                params: {contest_id: encryptData(r.id)}
            }).then(res => {
                if (res.data) {
                    this.$notice.success('Delete successfully')
                    this.getPage()
                }
            })
        },
        changeVisible(row) {
            this.$axios.get('/admin/contest/visible', {
                params: {pid: encryptData(row.id)}
            }).then(res => {

            })
        },
        manageContestProblem(row) {
            this.$router.push({
                name: 'adminContestProblemAll',
                params: {
                    cid: encryptData(row.id),
                    pid: 1
                }
            })
        }
    }
})
</script>

<template>
    <el-table
            v-loading="tableLoading"
            :data="items">
        <el-table-column label="ID" width="50" prop="id" align="center"></el-table-column>
        <el-table-column label="Title" prop="title"></el-table-column>
        <el-table-column label="Start Time" width="150" align="center">
            <template #default="slot">
                {{ $formatDate(slot.row.start_at) }}
            </template>
        </el-table-column>
        <el-table-column label="End Time" width="150" align="center">
            <template #default="slot">
                {{ $formatDate(slot.row.end_at) }}
            </template>
        </el-table-column>
        <el-table-column label="Author" prop="author" width="150" align="center"></el-table-column>
        <el-table-column label="Status" prop="" width="200" align="center">
            <template #default="slot">
                <el-tag
                        :type="ContestStatusLabel[slot.row.status].type"
                >{{ ContestStatusLabel[slot.row.status].label }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="Operation" width="200" align="center">
            <template #default="slot">
                <el-tooltip content="Edit contest">
                    <el-button plain
                               @click="editContest(slot.row)"
                               size="small">
                        <el-icon>
                            <Edit/>
                        </el-icon>
                    </el-button>
                </el-tooltip>
                <el-tooltip content="Manage problem">
                    <el-button plain
                               @click="manageContestProblem(slot.row)"
                               size="small">
                        <el-icon>
                            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 p-id="3388">
                                <path d="M512 97.52381c228.912762 0 414.47619 185.563429 414.47619 414.47619s-185.563429 414.47619-414.47619 414.47619S97.52381 740.912762 97.52381 512 283.087238 97.52381 512 97.52381z m0 73.142857C323.486476 170.666667 170.666667 323.486476 170.666667 512s152.81981 341.333333 341.333333 341.333333 341.333333-152.81981 341.333333-341.333333S700.513524 170.666667 512 170.666667z m45.32419 487.619047v73.142857h-68.510476l-0.024381-73.142857h68.534857z m-4.047238-362.008381c44.251429 8.923429 96.889905 51.126857 96.889905 112.518096 0 61.415619-50.151619 84.650667-68.120381 96.134095-17.993143 11.50781-24.722286 24.771048-24.722286 38.863238V609.52381h-68.534857v-90.672762c0-21.504 6.89981-36.571429 26.087619-49.883429l4.315429-2.852571 38.497524-25.6c24.551619-16.530286 24.210286-49.712762 9.020952-64.365715a68.998095 68.998095 0 0 0-60.391619-15.481904c-42.715429 8.387048-47.640381 38.521905-47.932952 67.779047v16.554667H390.095238c0-56.953905 6.534095-82.773333 36.912762-115.395048 34.03581-36.449524 81.993143-42.300952 126.268952-33.328762z"
                                      p-id="3389"></path>
                            </svg>
                        </el-icon>
                    </el-button>
                </el-tooltip>
                <el-tooltip content="Delete contest">
                    <el-button plain
                               @click="deleteContest(slot.row)"
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
</template>

<style scoped lang="scss">

</style>
