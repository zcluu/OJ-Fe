<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "index-page-footer"
})
</script>

<template>
    <div class="footer-box">
        <div style="margin-bottom: 10px;">
            <el-text class="footer-title">
                Link
            </el-text>
        </div>
        <el-row>
            <el-col :span="8">
                <el-space direction="vertical" alignment="start">
                    <el-link href="https://www.sdufe.edu.cn/">SDUFE</el-link>
                    <el-link href="https://github.com/sdufeACM">GitHub</el-link>
                    <el-link href="https://github.com/QingdaoU/OnlineJudge">QDU OnlineJudge</el-link>
                </el-space>
            </el-col>
            <el-col :span="8" style="position: relative;">
            </el-col>
            <el-col :span="8"></el-col>
        </el-row>
        <el-text style="font-weight: bold;">
            © 2023-2023 SDUFEACM && <a href="http://cslzc.py00.top/#/" style="color: #fff;">CSLZC</a>.
            All Rights Reserved.
        </el-text>
    </div>
</template>

<style scoped lang="scss">
.footer-box {
  //background-color: rgba(239, 239, 239, 0.65);
  background: url("http://oss.py00.cn/oj/footer-bg.jpg");
  height: 100%;
  width: calc(100% - 40px);
  padding: 20px;
  color: #fff;

  .el-link, .el-text {
    --el-link-text-color: #fff !important;
    --el-text-color: #fff !important;
  }

  .footer-title {
    font-weight: bold;
    font-size: 18px;
  }

  a {
    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>