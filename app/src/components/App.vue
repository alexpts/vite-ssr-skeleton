<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {ref} from 'vue'
import HelloWorld from './HelloWorld.vue'
//
// const env = {
//     apiUrl: import.meta.env.VITE_API_URL + '/test',
//     appMode: import.meta.env.MODE,
//     ssr: import.meta.env.SSR,
//     isDev: import.meta.env.DEV,
//     isProd: import.meta.env.PROD,
//     baseUrl: import.meta.env.BASE_URL
// }
//
// console.log(import.meta.env);

</script>

<template>
    <nav>
        <router-link :to="{name: 'posts'}">Posts</router-link> |
        <router-link :to="{name: 'home'}">Home</router-link> |
        <router-link :to="{name: 'about'}">About</router-link> |
        <router-link to="/asd">bad</router-link>
    </nav>

<!--    <router-view />-->
    <router-view v-slot="{ Component }">
        <suspense timeout="200">
<!--        <suspense>-->
            <component :is="Component"></component>
            <template #fallback>
                <span>Loading... Please wait.</span>
            </template>
        </suspense>
    </router-view>
</template>

<style lang="sass">
#app
    font-family: Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
</style>
