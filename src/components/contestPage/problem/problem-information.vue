<script>
import {defineComponent} from 'vue'
import {InfoFilled} from "@element-plus/icons-vue";

export default defineComponent({
    name: "contest-problem-information",
    props: ['problem'],
    components: {InfoFilled}
})
</script>

<template>
    <el-card shadow="never" class="information">
        <el-text size="large">
            <el-icon>
                <InfoFilled/>
            </el-icon>
            Information
        </el-text>
        <div class="item" style="padding-top: 12px;">
            <el-text class="label">ID</el-text>
            <el-text class="value">{{ $route.params.sid ? $route.params.sid : problem.id }}</el-text>
        </div>
        <div class="item">
            <el-text class="label">Time Limit</el-text>
            <el-text class="value">{{ problem.time_limit }}MS</el-text>
        </div>
        <div class="item">
            <el-text class="label">Memory Limit</el-text>
            <el-text class="value">{{ problem.memory_limit }}MB</el-text>
        </div>
        <div class="item">
            <el-text class="label">Rule Type</el-text>
            <el-text class="value">{{ problem.mode === 0 ? 'ACM' : 'OI' }}</el-text>
        </div>
        <div class="item">
            <el-text class="label">Created By</el-text>
            <el-text class="value">{{ problem.created_by }}</el-text>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.information {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0 3px;
    border-bottom: 1px solid var(--el-border-color);
  }
}

</style>
