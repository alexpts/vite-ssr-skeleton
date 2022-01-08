import { createSSRApp } from 'vue'
import App from './components/App.vue'
import routerFactory  from './router'
import { createStore } from './store';
import { sync } from 'vuex-router-sync'

const createApp = () => {
    const initStoreState = import.meta.env.SSR === false ? window.__VUEX_INIT_STATE__ : undefined

    const app = createSSRApp(App);
    const router = routerFactory.createRouter();
    const store = createStore(initStoreState);

    if (import.meta.env.SSR === false) {
        sync(store, router, {moduleName: '__route'})
    }

    return {
        app: app.use(router).use(store),
        router: router,
        store: store
    }
};

export {
    createApp
}

