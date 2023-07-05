<script>
import {defineComponent, reactive} from 'vue'
import {CodeJudgeStatus, JudgeStatus} from "../../constants";
import CodeEditor from "@/components/codeEditor.vue";

export default defineComponent({
    name: "problemSubmission",
    components: {CodeEditor},
    computed: {
        JudgeStatus() {
            return JudgeStatus
        }
    },
    data() {
        return {
            submissionList: [],
            tableLoading: true,

            page_size: 20,
            page_num: 1,
            total: 1,
            pages: 1,
            submissionInfoDialog: false
        }
    },
    setup() {
        const submissionInfo = reactive({})
        let code_source = reactive('')
        let language = reactive('')
        return {
            submissionInfo, code_source, language
        }

    },
    created() {
        this.getSubmissionList()
    },
    methods: {
        CodeJudgeStatus() {
            return CodeJudgeStatus
        },
        getSubmissionList() {
            this.$axios.get('/submission/problem', {
                params: {
                    pid: this.$route.params.pid,
                    size: this.page_size, page: this.page_num
                }
            }).then(res => {
                this.submissionList = res.data.items
                this.page_size = res.data.size
                this.page_num = res.data.page
                this.total = res.data.total
                this.pages = res.data.pages
            }).finally(() => {
                this.tableLoading = false
            })
        },
        getSubmissionDetail(r, c, e) {
            this.$axios.get('/submission/status', {params: {submission_id: r.id}}).then(res => {
                this.submissionInfo = JSON.parse(JSON.stringify(res.data))
                this.code_source = this.submissionInfo.code_source
                this.language = this.submissionInfo.language
                this.submissionInfoDialog = true
                this.$forceUpdate()
            })
        }
    }
})
</script>

<template>
    <el-table style="cursor: pointer;border: 1px solid var(--el-border-color);" stripe :data="submissionList"
              v-loading="tableLoading" @row-click="getSubmissionDetail">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="language" prop="language"></el-table-column>
        <el-table-column label="create_time" prop="create_time">
            <template #default="slot">
                {{ $formatDate(slot.row.create_time) }}
            </template>
        </el-table-column>
        <el-table-column label="result" prop="result">
            <template #default="slot">
                <el-text :type="CodeJudgeStatus()[parseInt(slot.row.result) + 2].type"
                         style="font-weight: bold;"
                >
                    {{ CodeJudgeStatus()[parseInt(slot.row.result) + 2].name }}
                </el-text>
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
            @current-change="getSubmissionList"
    ></el-pagination>
    <el-dialog title="Submission" v-model="submissionInfoDialog">
        <el-descriptions column="1" border
                         v-if="submissionInfoDialog"
        >
            <el-descriptions-item label="id">
                {{ submissionInfo.id }}
            </el-descriptions-item>
            <el-descriptions-item label="language">{{ submissionInfo.language }}</el-descriptions-item>
            <el-descriptions-item label="create_time">{{ $formatDate(submissionInfo.create_time) }}
            </el-descriptions-item>
            <el-descriptions-item label="result">
                <el-text :type="CodeJudgeStatus()[parseInt(submissionInfo.result) + 2].type">
                    {{ CodeJudgeStatus()[parseInt(submissionInfo.result) + 2].name }}
                </el-text>
            </el-descriptions-item>
        </el-descriptions>
        <div class="code">
            <code-editor
                    ref="codeEditor"
                    :model-value="code_source"
                    :init_language="language"
                    is_disabled
                    v-if="submissionInfoDialog"
            ></code-editor>
        </div>
    </el-dialog>
</template>

<style scoped lang="scss">
.code {
  //padding: 10px;
  //border: 1px solid var(--el-border-color);
  border-top: none;
}
</style>
