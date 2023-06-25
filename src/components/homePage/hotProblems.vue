<script>
import {defineComponent} from 'vue'
import {DArrowRight} from "@element-plus/icons-vue";

export default defineComponent({
    name: "hotProblems",
    components: {DArrowRight},
    data() {
        return {
            problems: []
        }
    },
    methods: {
        getData() {
            this.$axios.get('/problem/hot').then(res => {
                this.problems = res.data
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
        <div style="display: flex;justify-content: space-between;margin-bottom: 20px;">
            <h3 style="display: inline-block;">
                <el-icon color="#f00">
                    <svg class="icon"
                         style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3168">
                        <path d="M442.514286 73.142857c82.529524 64.24381 140.239238 126.610286 173.129143 187.099429 31.158857 57.295238 43.666286 115.907048 37.546666 175.835428l-1.219047 9.996191 6.095238-4.973715a174.055619 174.055619 0 0 0 49.249524-69.607619l2.681904-7.411809 7.704381-23.04c82.285714 55.734857 123.440762 150.064762 123.440762 283.062857C841.142857 823.515429 665.795048 950.857143 521.654857 950.857143c-144.11581 0-308.224-85.333333-334.750476-263.875048-26.550857-178.541714 83.480381-261.90019 158.427429-378.197333C395.288381 231.253333 427.690667 152.697905 442.514286 73.142857z"
                              p-id="3169"></path>
                    </svg>
                </el-icon>
                Hot Problems
            </h3>
            <el-link href="/problem" :underline="false">
                More
                <el-icon>
                    <DArrowRight/>
                </el-icon>
            </el-link>
        </div>
        <el-table :data="problems">
            <el-table-column label="ID">
                <template #default="slot">
                    <el-link
                            :href="'/problem/'+slot.row.id"
                            :underline="false">{{ slot.row.id }}
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="Title" prop="title">
                <template #default="slot">
                    <el-link
                        :href="'/problem/'+slot.row.id"
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
    </el-card>
</template>

<style scoped>

</style>