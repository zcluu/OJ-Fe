<script>
import {defineComponent} from 'vue'
import {Back} from "@element-plus/icons-vue";

export default defineComponent({
    name: "announcement",
    components: {Back},
    props: ['contestInfo'],
    data() {
        return {
            announcements: [],
            loading: true,
            showDetail: false,
            announcement: [],
            bottomCardHeight: ''
        }
    },
    mounted() {
        this.getAnnouncement()
    },
    methods: {
        getAnnouncement() {
            this.loading = true
            this.$axios.get('/contest/announcements', {
                params: {
                    contest_id: this.$route.params.cid
                }
            }).then(res => {
                this.announcements = res.data
            }).finally(() => {
                this.loading = false
            })
        },
        changePage(row, column, event) {
            this.announcement = row
            this.showDetail = true

            setTimeout(() => {
                this.bottomCardHeight = (this.$getheight.class('el-main') - 40 - this.$getheight.class('top-card') - 50 - this.$getheight.class('el-descriptions') - 30) + 'px'
            }, 50)
        }
    }
})
</script>

<template>
    <slot name="default"></slot>
    <el-table :data="announcements" @row-click="changePage" style="cursor:pointer;" v-loading="loading"
              v-if="!showDetail"
    >
        <el-table-column type="index" width="80" align="center"></el-table-column>
        <el-table-column label="title" prop="title"></el-table-column>
        <el-table-column label="Update Time" prop="update_time" width="150" align="center">
            <template #default="slot">
                {{ $formatDate(slot.row.update_time) }}
            </template>
        </el-table-column>
        <el-table-column label="Author" prop="author" width="120" align="center"></el-table-column>
    </el-table>
    <div v-else>
        <el-descriptions column="1"
                         border
        >
            <template #title>
                <el-page-header @back="showDetail=false">
                    <template #content>
                        {{ announcement.title }}
                    </template>
                </el-page-header>
            </template>
            <el-descriptions-item label-align="right" label="Create Time">{{
                $formatDate(announcement.create_time)
                }}
            </el-descriptions-item>
            <el-descriptions-item label-align="right" label="Update Time">{{
                $formatDate(announcement.update_time)
                }}
            </el-descriptions-item>
        </el-descriptions>
        <el-scrollbar class="content" :height="bottomCardHeight">
            {{ announcement.content }}
        </el-scrollbar>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.el-descriptions__cell.el-descriptions__content) {
  width: 80% !important;
}

.content {
  padding: 10px;
  border: 1px solid var(--el-border-color);
  border-top: none;
}
</style>
