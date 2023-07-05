<script>
import {defineComponent} from 'vue'
import {CopyDocument, List, Menu, PieChart} from "@element-plus/icons-vue";
import {Codemirror} from "vue-codemirror";
import ProblemInformation from "@/components/contestPage/problem/problem-information.vue";
import ProblemStatistics from "@/components/contestPage/problem/problem-statistics.vue";
import CodeEditor from "@/components/codeEditor.vue";
import {CodeJudgeStatus, JudgeStatus} from "@/constants";

export default defineComponent({
    name: "contestProblemDetail",
    computed: {
        JudgeStatus() {
            return JudgeStatus
        },
        CodeJudgeStatus() {
            return CodeJudgeStatus
        },
    },
    components: {CodeEditor, ProblemStatistics, PieChart, List, Menu, ProblemInformation, Codemirror, CopyDocument},
    data() {
        return {
            problem: {},
            samples: [],
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            this.$axios.get('/problem/detail', {params: {problem_id: window.localStorage.getItem('contestProblemId')}}).then(res => {
                this.problem = res.data
                this.samples = res.data.samples
            })
        },
    }
})
</script>

<template>
    <div style="width: 80%;margin: 0 auto;">
        <el-row :gutter="20" style="width: 80%;margin:0 auto;">
            <el-col :span="16">
                <router-view :problem="problem" :samples="samples"/>
            </el-col>
            <el-col :span="8">
                <el-card shadow="never" style="margin-bottom: 10px;">
                    <el-text size="large" style="cursor: pointer;"
                             @click="$router.push({
                                 name:'contestProblemSubmission',
                                 params:{pid:$route.params.pid}
                             })">
                        <el-icon>
                            <List/>
                        </el-icon>
                        My Submission
                    </el-text>
                </el-card>
                <problem-information :problem="problem"/>
                <problem-statistics :problem="problem"/>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.problem-item {
  padding: 10px 0;

  .title {
    font-size: 18px;
    font-weight: bold;
    color: var(--sdufe-color);
  }

  .codes {
    padding: 10px;
    border: 1px solid var(--el-border-color);
    margin-top: 3px;
    border-radius: 3px;
  }

  .copy-btn {
    cursor: pointer;
  }
}

.status {
  padding: 0 5px;

  .dot {
    margin-right: 5px;
  }
}
</style>
