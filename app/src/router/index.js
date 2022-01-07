import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';

const isSsr = import.meta.env.SSR === true;
const routerPrefix = import.meta.env.BASE_URL;

const routes = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld,
        props: {msg: 'Hi' },
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

export default {
    createRouter: () => {
        const historyStore = isSsr ? createMemoryHistory(routerPrefix) : createWebHistory(routerPrefix);
        return createRouter({
            history: historyStore,
            routes
        });
    }
};
