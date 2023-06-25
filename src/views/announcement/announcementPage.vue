<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "announcementPage",
    mounted() {
        console.log(this.$route)
    }
})
</script>

<template>
  announcementPage
    <router-view/>
</template>

<style scoped>

</style>