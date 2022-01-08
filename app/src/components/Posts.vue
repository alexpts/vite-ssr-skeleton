<script setup>
import { onServerPrefetch, onUnmounted, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const init = async() => {
    return await store.dispatch('test/fetch')
}

// ssr only
onServerPrefetch(async () => {
    store.commit('setCount', 10)
    await init()
})

if (!import.meta.env.SSR && !store.state.isSsrInit) {
    await init()
}

onUnmounted(() => {
    store.commit('setPosts', []);
})
</script>

<template>
    <h1>Posts:</h1>

    {{ store.state.posts.length }}
</template>
