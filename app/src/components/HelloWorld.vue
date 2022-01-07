<script setup>
import {ref} from 'vue'
import { useStore } from 'vuex'

import {COMMIT_COUNT_INCREMENT} from '../store/store.js'

const store = useStore()

//const apiUrl = import.meta.env.VITE_API_URL;
const isSSR = import.meta.env.SSR;

defineProps({
    msg: {
        type: String,
        required: true
    },
})

const count = ref(0)
</script>

<template>
    <h1>{{ msg }}</h1>

    <img alt="Vue logo" src="../assets/logo.png"/>

    <p>
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
        +
        <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
            Vite Documentation
        </a>
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <button type="button" @click="store.commit(COMMIT_COUNT_INCREMENT)">count is: {{ store.state.count }}</button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<style scoped lang="sass">
a
    color: #42b983
</style>
