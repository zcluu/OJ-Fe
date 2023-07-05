<script>
import {defineComponent} from 'vue'
import {DArrowRight} from "@element-plus/icons-vue";
import {ContestStatus} from "@/constants";

export default defineComponent({
    name: "recentContests",
    computed: {
        ContestStatus() {
            return ContestStatus
        }
    },
    components: {DArrowRight},
    data() {
        return {
            contests: []
        }
    },
    methods: {
        getData() {
            this.$axios.get('/contest/recent').then(res => {
                this.contests = res.data
            })
        }
    },
    mounted() {
        this.getData()
        new Date().getHours()
    }
})
</script>

<template>
    <el-card
            shadow="never"
    >
        <div style="display: flex;justify-content: space-between;margin-bottom: 20px;">
            <h3 style="display: inline-block;">Recent Contests</h3>
            <el-link href="/contest" :underline="false">
                More
                <el-icon>
                    <DArrowRight/>
                </el-icon>
            </el-link>
        </div>
        <el-table :data="contests">
            <el-table-column label="Title" prop="title">
                <template #default="slot">
                    <el-link
                            :href="'/contest/detail/'+slot.row.id"
                            :underline="false">{{ slot.row.title }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="Start Time" prop="start_at">
                <template #default="slot">
                    {{ $formatDate(slot.row.start_at) }}
                </template>
            </el-table-column>
            <el-table-column label="End Time" prop="end_at">
                <template #default="slot">
                    {{ $formatDate(slot.row.end_at) }}
                </template>
            </el-table-column>
            <el-table-column label="Status" prop="status" width="150">
                <template #default="slot">
                    <span>
                        <template v-if="slot.row.status===ContestStatus.CONTEST_ENDED">
                            <span class="dot danger" style="margin-right: 5px;"></span>
                            <span>Ended</span>
                        </template>
                        <template v-if="slot.row.status===ContestStatus.CONTEST_UNDERWAY">
                            <span class="dot danger" style="margin-right: 5px;"></span>
                            <span>Running</span>
                        </template>
                        <template v-if="slot.row.status===ContestStatus.CONTEST_NOT_START">
                            <span class="dot success" style="margin-right: 5px;"></span>
                            <span>Not Start</span>
                        </template>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped>

</style>
