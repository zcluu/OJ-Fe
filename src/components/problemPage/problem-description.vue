<script>
import {defineComponent} from 'vue'
import CodeEditor from "@/components/codeEditor.vue";
import {CopyDocument} from "@element-plus/icons-vue";
import {CodeJudgeStatus, JudgeStatus} from "@/constants";
import {cpp} from "@codemirror/lang-cpp";
import {python} from "@codemirror/lang-python";
import {javascript} from "@codemirror/lang-javascript";
import {php} from "@codemirror/lang-php";

export default defineComponent({
    name: "problem-description",
    components: {CopyDocument, CodeEditor},
    props: ['problem', 'samples'],
    computed: {
        CodeJudgeStatus() {
            return CodeJudgeStatus
        },
    },
    data() {
        return {
            selectedText: '',
            submitForm: {
                selectedLanguage: '',
                sourcecode: ''
            },
            l2e: {
                cxx: cpp(),
                c: cpp(),
                py3: python(),
                py2: python(),
                js: javascript(),
                php: php()
            },
            extensions: [cpp()],
            waitSubmit: false,
            waitLoading: false,
            submission_id: '',
            timer: null,
            judgeStatus: null
        }
    },
    methods: {
        copyCode(ix) {
            this.selectedText = this.samples[ix][0]
            setTimeout(() => {
                let input = document.getElementById('copyArea')
                input.select()
                document.execCommand('copy')
                this.$notice.success('Successfully copied code!')
            }, 50)
        },
        submitCode() {
            let data = {
                "pid": this.$route.params.pid,
                "language": this.submitForm.selectedLanguage,
                "source_code": this.$refs.codeEditor.code,
                "cp_id": this.problem.cp_id
            }
            this.waitSubmit = true
            this.$axios.post('/submission/judge', data).then(res => {
                this.waitSubmit = false
                this.submission_id = res.data
                this.waitLoading = true
                this.timer = setInterval(this.getSubmissionResult, 1000)
            })
        },
        getSubmissionResult() {
            this.$axios.get('/submission/status', {params: {submission_id: this.submission_id}}).then(res => {
                if (res.data.result !== JudgeStatus.JUDGING) {
                    this.waitLoading = false
                    this.judgeStatus = res.data.result
                    clearInterval(this.timer)
                }
            })
        },
        changeLanguage() {
            this.extensions = [this.l2e[this.submitForm.selectedLanguage]]
            this.$refs.codeEditor.updateExtension(this.submitForm.selectedLanguage)
        }
    }
})
</script>

<template>
    <el-card shadow="never">
        <h2>{{ problem.title }}</h2>
        <div class="problem-item">
            <div class="title">Description</div>
            <div class="problem-item-content" v-html="problem.description"></div>
        </div>
        <div class="problem-item">
            <div class="title">Input</div>
            <div class="problem-item-content" v-html="problem.inputs"></div>
        </div>
        <div class="problem-item">
            <div class="title">Output</div>
            <div class="problem-item-content" v-html="problem.outputs"></div>
        </div>
        <div v-for="(sample,index) in samples">
            <div class="problem-item">
                <div class="title">
                    Sample Input{{ index + 1 }}
                    <el-icon class="copy-btn" @click="copyCode(index)">
                        <CopyDocument/>
                    </el-icon>
                </div>
                <pre class="codes" :id="'sample-input-'+index">{{ sample[0] }}</pre>
            </div>
            <div class="problem-item">
                <div class="title">Sample Output{{ index + 1 }}</div>
                <pre class="codes">{{ sample[1] }}</pre>
            </div>
        </div>
        <template v-if="problem.hints">
            <div class="problem-item">
                <div class="title">Hints</div>
                <div class="problem-item-content" v-html="problem.hints"></div>
            </div>
        </template>
    </el-card>
    <el-card shadow="never" style="margin-top: 20px;">
        <el-form>
            <el-form-item label="Language">
                <el-select v-model="submitForm.selectedLanguage" @change="changeLanguage">
                    <el-option v-for="it in problem.language"
                               :value="it"
                    ></el-option>
                </el-select>
            </el-form-item>
            <code-editor
                    ref="codeEditor"
                    v-model="submitForm.sourcecode"
                    placeholder="Code goes here..."
                    height="400px"
            ></code-editor>
            <div style="display: flex;justify-content: end;margin-top: 10px;">
                <el-text class="status" v-if="judgeStatus!==null">
                    <i class="dot" :class="CodeJudgeStatus[parseInt(judgeStatus)+ 2].type"></i>
                    {{ CodeJudgeStatus[parseInt(judgeStatus) + 2].name }}
                </el-text>
                <el-text class="status" v-else-if="problem.status">
                    <i class="dot" :class="CodeJudgeStatus[parseInt(problem.status.submission.result)+ 2].type"></i>
                    {{ CodeJudgeStatus[parseInt(problem.status.submission.result) + 2].name }}
                </el-text>
                <el-button type="success" plain
                           :disabled="waitSubmit"
                           @click="submitCode"
                           :loading="waitLoading"
                >
                    {{ waitSubmit ? "Pending" : waitLoading ? "Judging" : "Submit" }}
                </el-button>
            </div>
        </el-form>
    </el-card>
    <textarea style="opacity: 0;height: 0;width: 0;" id="copyArea" v-model="selectedText"></textarea>
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
