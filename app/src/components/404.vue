<script setup>
import {onServerPrefetch} from 'vue'
import { useStore } from 'vuex'
const store = useStore()

onServerPrefetch(() => {
    return new Promise(resolve => {
        store.commit('setCount', 10)
        //setTimeout(resolve, 2000)
        resolve()
    })
})

</script>

<template>
    <h1>Page 404</h1>
</template>
