<script setup>
import { onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { init, initBrowser, initSSR } from '../plugin/ssr'

const store = useStore()

init(() => {
    console.log('Init ALL')
    return store.dispatch('test/fetch')
}, {store});

initBrowser(() => {
    console.log('browser only')
})

initSSR(() => {
    store.commit('setCount', 10)
    console.log('SSR only');
})

onUnmounted(() => {
    store.commit('setPosts', [])
})
</script>

<template>
    <h1>Posts:</h1>
    {{ store.state.ssr.isSsr }}

    {{ store.state.posts.length }}
</template>
