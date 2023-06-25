<script>
import {defineComponent} from 'vue'
import ProblemInformation from "@/components/problemPage/problem-information.vue";

export default defineComponent({
    name: "problem-statistics",
    props: ['problem'],
    components: {ProblemInformation}
})
</script>

<template>
    <el-card shadow="never" style="margin-top: 10px;">
        <el-text size="large">
            <el-icon>
                <svg class="icon"
                     style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                     viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="680">
                    <path d="M85.312 512a426.688 426.688 0 0 0 844.8 85.312H426.688V93.888A426.816 426.816 0 0 0 85.312 512zM512 0v512h512a512 512 0 1 1-512-512z m506.816 438.848H585.152V5.184a512.32 512.32 0 0 1 433.664 433.664z"
                          fill="#262626" p-id="681"></path>
                </svg>
            </el-icon>
            Statistics
        </el-text>
        <div style="width: 100%;text-align: center;padding-top: 30px;">
            <el-progress class="rate" type="circle" :percentage="((problem.ac_count / problem.submission_count) * 100).toFixed(2)" status="success"
                         stroke-linecap="square"
            >
                <el-text>{{ ((problem.ac_count / problem.submission_count) * 100).toFixed(2) }}%</el-text>
            </el-progress>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.rate {
  --el-fill-color-light: #f40 !important;
}
</style>