<script>
import {defineComponent} from 'vue'
import {CopyDocument, List, Menu, PieChart} from "@element-plus/icons-vue";
import {Codemirror} from "vue-codemirror";
import {javascript} from '@codemirror/lang-javascript'
import {python} from '@codemirror/lang-python'
import {cpp} from '@codemirror/lang-cpp'
import {php} from '@codemirror/lang-php'
import ProblemInformation from "@/components/problemPage/problem-information.vue";
import ProblemStatistics from "@/components/problemPage/problem-statistics.vue";

export default defineComponent({
    name: "problemDetail",
    components: {ProblemStatistics, PieChart, List, Menu, ProblemInformation, Codemirror, CopyDocument},
    setup() {
    },
    data() {
        return {
            problem: {},
            samples: [],
            selectedText: '',
            submitForm: {
                selectedLanguage: '',
                sourcecode: ''
            },
            extensions: [],
            waitSubmit: true
        }
    },
    mounted() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            this.$axios.get('/problem/detail', {params: {problem_id: this.$route.params.pid}}).then(res => {
                this.problem = res.data
                this.samples = res.data.samples
            })
        },
        copyCode(ix) {
            this.selectedText = this.samples[ix][0]
            setTimeout(() => {
                let input = document.getElementById('copyArea')
                input.select()
                document.execCommand('copy')
            }, 200)
        }
    }
})
</script>

<template>
    <el-row :gutter="20" style="width: 80%;margin:0 auto;">
        <el-col :span="16">
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
                        <el-select v-model="submitForm.selectedLanguage">
                            <el-option v-for="it in problem.language"
                                       :value="it"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <codemirror
                            v-model="submitForm.sourcecode"
                            placeholder="Code goes here..."
                            :style="{ height: '400px' }"
                            :autofocus="true"
                            :indent-with-tab="true"
                            :tab-size="2"
                            :extensions="extensions"
                    />
                    <div style="display: flex;justify-content: end;margin-top: 10px;">
                        <el-button type="success" plain :disabled="waitSubmit">Submit</el-button>
                    </div>
                </el-form>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card shadow="never" style="margin-bottom: 10px;">
                <el-text size="large" style="cursor: pointer;"
                         @click="$router.push('/problem/'+$route.params.pid+'/submission')">
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

</style>