<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "admin-contest-add",
    data() {
        return {
            contest: {
                title: '',
                description: '',
                start_at: '',
                end_at: '',
                contest_type: 0,
                password: '',
                only_id: 'After submitting this form, you will receive the website address',
                rule: 0,
            }
        }
    },
    created() {
        if (this.$route.fullpath === '/admin/contest/edit' && !this.$route.params.cid) {
            this.$notice.error('Invalid Request!')
            this.$router.push({
                name: 'adminHome'
            })
        }
        if (this.$route.params.cid) {
            this.$axios.get('/admin/contest/detail', {params: {cid: this.$route.params.cid}}).then(res => {
                this.contest = res.data
            })
        }
    },
    methods: {
        submitForm() {
            if (this.$route.params.cid) {
                this.$axios.post('/admin/contest/update', this.contest).then(res => {
                    if (res.data) {
                        this.$notice.success('Save contest successfully!')
                    }
                })
            } else {
                this.$axios.post('/admin/contest/add', this.contest).then(res => {
                    if (res.data) {
                        this.$notice.success('Create contest successfully!')
                    }
                })
            }
        }
    }
})
</script>

<template>
    <el-card>
        <template #header>
            <span style="font-weight: bold;color: var(--sdufe-color);font-size: 20px;">Create Contest</span>
        </template>
        <el-form
                :model="contest"
                label-position="top"
        >
            <el-form-item label="Title" prop="title">
                <el-input v-model="contest.title"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <el-input v-model="contest.description" type="textarea"
                          :autosize="{ minRows: 6, maxRows: 6 }"
                ></el-input>
            </el-form-item>
            <el-row :gutter="80">
                <el-col :span="12">
                    <el-form-item label="Start Time" prop="start_at">
                        <el-date-picker type="datetime"
                                        style="width: 100%"
                                        placeholder="Select start datetime"
                                        v-model="contest.start_at"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="End Time" prop="end_at">
                        <el-date-picker type="datetime"
                                        style="width: 100%"
                                        placeholder="Select end datetime"
                                        v-model="contest.end_at"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="12">
                    <el-form-item label="Contest Type" prop="contest_type">
                        <el-radio-group v-model="contest.contest_type">
                            <el-radio :label="0">Normal</el-radio>
                            <el-radio :label="1">Password Protected</el-radio>
                            <el-radio :label="2">Accessing through URL</el-radio>
                            <el-radio :label="3">Hidden and unavailable</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="contest.contest_type===1">
                    <el-form-item label="Contest Password" prop="password">
                        <el-input v-model="contest.password"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="contest.contest_type===2">
                    <el-form-item label="Contest URL" prop="only_id">
                        <el-input readonly disabled v-model="contest.only_id"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="Contest Rule" prop="rule">
                <el-radio-group v-model="contest.rule">
                    <el-radio :label="0">ACM</el-radio>
                    <el-radio :label="1">OI</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-button plain type="success" style="width: 100%;"
                   @click="submitForm"
        >Submit
        </el-button>
    </el-card>
</template>

<style scoped lang="scss">

:deep(.el-form-item .el-form-item__label) {
  font-size: 18px;
  font-weight: bold;
  color: var(--sdufe-color);
}

</style>
