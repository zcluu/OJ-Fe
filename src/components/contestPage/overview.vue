<script>
import {defineComponent} from 'vue'
import {ContestStatus} from "@/constants";

export default defineComponent({
    name: "overview",
    computed: {
        ContestStatus() {
            return ContestStatus
        }
    },
    props: ['contestInfo'],
    data() {
        return {
            bottomCardHeight: ''
        }
    },
    mounted() {
        setTimeout(() => {
            this.bottomCardHeight = (this.$getheight.class('el-main') - 40 - this.$getheight.class('top-card') - 50) + 'px'
        }, 50)
    }
})
</script>

<template>
    <div style="margin: 0 auto;transition-duration: .3s" :style="{
        width: $route.name==='contestRank'?'80%':'50%'
    }">
        <el-card shadow="never" class="top-card">
            <el-text class="title">{{ contestInfo.title }}</el-text>
            <el-text class="duration">
                {{ $formatDate(contestInfo.start_at) }}
                ~
                {{ $formatDate(contestInfo.end_at) }}
            </el-text>
            <div class="status">
                <template v-if="contestInfo.status===ContestStatus.CONTEST_UNDERWAY">
                    <div class="dot danger"></div>
                    <el-text style="padding-left: 3px;">Running</el-text>
                </template>
                <template v-if="contestInfo.status===ContestStatus.CONTEST_ENDED">
                    <div class="dot danger"></div>
                    <el-text style="padding-left: 3px;">Ended</el-text>
                </template>
                <template v-if="contestInfo.status===ContestStatus.CONTEST_NOT_START">
                    <div class="dot success"></div>
                    <el-text style="padding-left: 3px;">Not Start</el-text>
                </template>
            </div>
        </el-card>
        <el-card shadow="never" class="bottom-card"
                 :body-style="{
                    minHeight:bottomCardHeight,
                 }"
        >
            <el-scrollbar :height="bottomCardHeight">
                <router-view :contestInfo="contestInfo"/>
            </el-scrollbar>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.title {
  display: block;

  font-size: 1.6rem;
  text-align: center;
  padding-bottom: 8px;
}

.duration {
  display: block;
  text-align: center;
}

.top-card {
  position: relative;

  .status {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    border: 1px solid var(--el-border-color);
    border-right: none;
    border-top: none;
    cursor: pointer;
    transition-duration: .3s;
    text-align: center;

    &:hover {
      border-color: var(--el-border-color-hover);
    }
  }
}

.bottom-card {
  margin-top: 5px;
}
</style>
