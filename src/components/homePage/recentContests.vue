<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "recentContests",
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
            style="margin-top: 20px;"
    >
        <h3 style="margin-bottom: 20px;">Recent Contests</h3>
        <el-table :data="contests">
            <el-table-column label="Title" prop="title">
                <template #default="slot">
                    <el-link
                            :href="'/contest/'+slot.row.id"
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
            <el-table-column label="Status" prop="status">
                <template #default="slot">
                    <span>
                        <template v-if="slot.row.status==='-1'">
                            <span class="dot danger" style="margin-right: 5px;"></span>
                            <span>Ended</span>
                        </template>
                        <template v-if="slot.row.status==='0'">
                            <span class="dot danger" style="margin-right: 5px;"></span>
                            <span>Running</span>
                        </template>
                        <template v-if="slot.row.status==='1'">
                            <span class="dot success" style="margin-right: 5px;"></span>
                            <span>Waiting</span>
                        </template>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<style scoped>

</style>