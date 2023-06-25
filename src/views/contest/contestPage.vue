<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "contestPage",
    data() {
        return {
            items: [],
            page_size: 20,
            page_num: 1,
            total: 1,
            pages: 1,
        }
    },
    mounted() {
        this.getPage()
    },
    methods: {
        getPage() {
            this.$axios.get('/problem/all', {params: {size: this.page_size, page: this.page_num}}).then(res => {
                this.items = res.data.items
                this.page_size = res.data.size
                this.page_num = res.data.page
                this.total = res.data.total
                this.pages = res.data.pages
            })
        },
        changePage(page) {
            this.page_num = page
            this.getPage()
        }
    }
})
</script>

<script setup>
</script>

<template>
    <el-pagination
            v-modelr:current-page="page_num"
            :hide-on-single-page="false"
            :page-size="page_size"
            layout="prev, pager, next"
            :page-count="pages"
            @current-change="changePage"
    ></el-pagination>
</template>

<style scoped>

</style>