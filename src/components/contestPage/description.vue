<script>
import {defineComponent} from 'vue'

export default defineComponent({
    name: "description",
    props:['contestInfo']
})
</script>

<template>
  <div v-html="contestInfo.description"></div>
</template>

<style scoped lang="scss">


</style>
