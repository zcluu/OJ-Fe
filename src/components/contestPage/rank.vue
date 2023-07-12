<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "rank",
    data() {
        return {
            rankInfo: [],
            tableLoading: true,

            page_size: 20,
            page_num: 1,
            total: 1,
            pages: 1,
            submissionInfoDialog: false,

            p_length: 0,
        }
    },
    created() {
        this.getRankList()
    },
    methods: {
        getRankList() {
            this.$axios.get('/contest/rank', {
                params: {
                    cid: this.$route.params.cid,
                    size: this.page_size, page: this.page_num
                }
            }).then(res => {
                this.rankInfo = res.data.ranks.items
                this.page_size = res.data.ranks.size
                this.page_num = res.data.ranks.page
                this.total = res.data.ranks.total
                this.pages = res.data.ranks.pages

                this.p_length = res.data.length
            }).finally(() => {
                this.tableLoading = false
            })
        }
    }
})
</script>

<template>
    <el-table :data="rankInfo">
        <el-table-column label="rk" prop="rk" width="80" align="center">
            <template #default="slot">
                {{ page_size * (page_num - 1) + (slot.$index + 1) }}
            </template>
        </el-table-column>
        <el-table-column label="username" prop="username" width="200" align="center"></el-table-column>
        <el-table-column label="ac count" prop="ac_count" width="100" align="center"></el-table-column>
        <el-table-column label="total time" prop="total_time" width="120" align="center"></el-table-column>
        <el-table-column v-for="ix in p_length"
                         :label="String.fromCharCode(64 + ix)"
                         align="center"
        >
            <template #default="slot">
                <div style="text-align: center;display: flex;flex-direction: column;">
                    <el-text
                            :type="slot.row.submissions[ix-1].is_first_ac?'success':'default'"
                            :style="{
                                fontWeight:slot.row.submissions[ix-1].is_first_ac?'bold':'normal'
                            }"
                            v-if="slot.row.submissions[ix-1].is_ac"
                    >
                        {{ slot.row.submissions[ix - 1].total_time }}
                    </el-text>
                    <el-text v-if="!slot.row.submissions[ix-1].is_ac"
                             type="danger"
                    >
                        (-{{ slot.row.submissions[ix - 1].submission_number }})
                    </el-text>
                    <el-text
                            :type="slot.row.submissions[ix-1].is_first_ac?'success':'default'"
                            :style="{
                                fontWeight:slot.row.submissions[ix-1].is_first_ac?'bold':'normal'
                            }"
                            v-if="slot.row.submissions[ix-1].submission_number && slot.row.submissions[ix-1].submission_number!==1 && slot.row.submissions[ix-1].is_ac"
                    >
                        (-{{ slot.row.submissions[ix - 1].submission_number - 1 }})
                    </el-text>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<style scoped lang="scss">

</style>
