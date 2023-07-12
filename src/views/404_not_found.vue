<script>
import {defineComponent} from 'vue'
import img from '@/assets/404bg.jpg'

export default defineComponent({
    name: "404",
    beforeCreate() {
        window.location.href = '/404.html'
    }
})
</script>

<template>
</template>

