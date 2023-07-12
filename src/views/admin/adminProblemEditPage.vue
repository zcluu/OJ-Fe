<script>
import {defineComponent} from 'vue'
import ProblemInformation from "@/components/problemPage/problem-information.vue";
import ProblemStatistics from "@/components/problemPage/problem-statistics.vue";
import {Plus, UploadFilled} from "@element-plus/icons-vue";

export default defineComponent({
    name: "adminProblemEditPage",
    components: {Plus, UploadFilled, ProblemStatistics, ProblemInformation},
    data() {
        return {
            problem: {
                id: -1,
                title: '',
                description: '',
                inputs: '',
                outputs: '',
                samples: [],
                language: [],
                mode: 0,
                is_spj: false,
                source: '',
                time_limit: '',
                memory_limit: '',
                hints: '',
                test_id: '',
            },
            samples: [],
            xToken: window.localStorage.getItem('token'),
            problemRule: {
                title: [{required: true, message: 'Please input title', trigger: 'blur'}],
                description: [{required: true, message: 'Please input description', trigger: 'blur'}],
                inputs: [{required: true, message: 'Please input inputs', trigger: 'blur'}],
                outputs: [{required: true, message: 'Please input outputs', trigger: 'blur'}],
                samples: [{required: true, message: 'Please input samples', trigger: 'blur'}],
                language: [{required: true, message: 'Please select language', trigger: 'blur'}],
                mode: [{required: true, message: 'Please select mode', trigger: 'blur'}],
                is_spj: [{required: true, message: 'Please select is_spj', trigger: 'blur'}],
                time_limit: [{required: true, message: 'Please input time_limit', trigger: 'blur'}],
                memory_limit: [{required: true, message: 'Please input memory_limit', trigger: 'blur'}],
                test_id: [{required: true, message: 'Please upload testcase', trigger: 'blur'}],
            }
        }
    },
    created() {
        if (this.$route.params.pid) this.getDetail()
    },
    methods: {
        getDetail() {
            this.$axios.get('/problem/detail', {params: {pid: this.$route.params.pid}}).then(res => {
                this.problem = res.data
                this.samples = res.data.samples
            })
        },
        uploadSuccess(response, uploadFile, uploadFiles) {
            this.problem.test_id = response.id
            this.$notice.success('Upload testcase successfully!')
        },
        saveProblem() {
            const url = this.problem.id === -1 ? '/admin/problem/add' : '/admin/problem/update'
            this.$axios.post(url, {
                cid: this.$route.params.cid,
                id: this.problem.id,
                title: this.problem.title,
                description: this.problem.description,
                inputs: this.problem.inputs,
                outputs: this.problem.outputs,
                samples: this.problem.samples,
                language: this.problem.language,
                mode: this.problem.mode,
                is_spj: this.problem.is_spj,
                source: this.problem.source,
                time_limit: this.problem.time_limit,
                memory_limit: this.problem.memory_limit,
                hints: this.problem.hints,
                test_id: this.problem.test_id,
            }).then(res => {
                if (res.data) {
                    if (this.problem.id === -1) {
                        this.$notice.success('Add new problem successfully!')
                    } else {
                        this.$notice.success('Save Successfully!')
                    }
                }
            })
        },
    }
})
</script>

<template>
    <div style="width: 60%;margin: 0 auto;padding: 20px;background-color: var(--el-bg-color);">
        <el-form :model="problem"
                 label-position="top"
                 :rules="problemRule"
                 status-icon
        >
            <el-form-item label="title" prop="title">
                <el-input v-model="problem.title"></el-input>
            </el-form-item>
            <el-form-item label="description" prop="description">
                <el-input v-model="problem.description" type="textarea"
                          :autosize="{ minRows: 6, maxRows: 6 }"
                ></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="input" prop="inputs">
                        <el-input v-model="problem.inputs" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 4 }"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="output" prop="outputs">
                        <el-input v-model="problem.outputs" type="textarea"
                                  :autosize="{ minRows: 4, maxRows: 4 }"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(sample,index) in problem.samples">
                <el-col :span="12">
                    <el-form-item :label="'Sample input'+(index+1)" prop="input">
                        <el-input v-model="sample[0]" type="textarea"
                                  :autosize="{ minRows: 1, maxRows: 4 }"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item :label="'Sample output'+(index+1)" prop="output">
                        <el-input v-model="sample[1]" type="textarea"
                                  :autosize="{ minRows: 1, maxRows: 4 }"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-button style="width: 100%;margin-bottom: 10px;"
                       @click="problem.samples.push([])"
            >
                <el-icon style="margin-right: 10px;">
                    <Plus/>
                </el-icon>
                Add Sample
            </el-button>
            <el-form-item label="Language" prop="language">
                <el-checkbox-group v-model="problem.language">
                    <el-checkbox label="c" name="type"/>
                    <el-checkbox label="cxx" name="type"/>
                    <el-checkbox label="py3" name="type"/>
                    <el-checkbox label="py2" name="type"/>
                    <el-checkbox label="php" name="type"/>
                    <el-checkbox label="go" name="type"/>
                    <el-checkbox label="js" name="type"/>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Rule Type" prop="mode">
                <el-radio-group v-model="problem.mode">
                    <el-radio :label="0">ACM</el-radio>
                    <el-radio :label="1">OI</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Special Judge" prop="is_spj">
                <el-switch
                        v-model="problem.is_spj"
                        active-text="Special Judge"
                        inactive-text="Normal Judge"
                ></el-switch>
            </el-form-item>
            <el-form-item label="Source" prop="source">
                <el-input v-model="problem.source" type="text"></el-input>
            </el-form-item>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="Time Limit(MS)" prop="time_limit">
                        <el-input v-model="problem.time_limit" type="number"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Memory Limit(MB)" prop="memory_limit">
                        <el-input v-model="problem.memory_limit" type="number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="hints" prop="hints">
                <el-input v-model="problem.hints" type="textarea"
                          :autosize="{ minRows: 4, maxRows: 4 }"
                ></el-input>
            </el-form-item>
            <el-form-item label="Test Cases" prop="test_id">
                <el-input v-model="problem.test_id" readonly></el-input>
                <div style="width: 100%;margin-top: 10px;">
                    <el-upload
                            class="upload-demo"
                            drag
                            :action="$axios.defaults.baseURL+'/admin/problem/upload/testcases'"
                            accept=".zip"
                            :headers="{
                                'X-Token':xToken
                            }"
                            :on-success="uploadSuccess"
                    >
                        <el-icon class="el-icon--upload">
                            <upload-filled/>
                        </el-icon>
                        <div class="el-upload__text">
                            Drop file here or <em>click to upload</em>
                        </div>
                        <template #tip v-if="$route.params.pid">
                            <div class="el-upload__tip" style="font-weight: bold;color: #ff0000">
                                This operation will overwrite existing data
                            </div>
                        </template>
                    </el-upload>
                </div>
            </el-form-item>
            <div style="display: flex;justify-content: end;">
                <el-button type="success" plain style="width: 100%;" @click="saveProblem">Save</el-button>
            </div>
        </el-form>
    </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item .el-form-item__label) {
  font-size: 18px;
  font-weight: bold;
  color: var(--sdufe-color);
}

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
