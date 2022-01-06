import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

// baseUrl: import.meta.env.BASE_URL

const routes = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld,
        props: {msg: 'Hi' },
        score: 100
    },
    {
        path: '/about/',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/About.vue'),
    },
    {
        path: '/:path(.*)',
        name: 'otherwise',
        component: () => import(/* webpackChunkName: "404" */ '../components/404.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    strict: true
});

export default router;
