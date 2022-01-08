import { createSSRApp } from 'vue'
import App from './components/App.vue'
import routerFactory  from './router'
import { createStore } from './store';
import { sync } from 'vuex-router-sync'

const createApp = () => {
    const app = createSSRApp(App);
    const router = routerFactory.createRouter();
    const store = createStore({});

    const unsync = sync(store, router)

    return {
        app: app.use(router).use(store),
        router: router,
        store: store
    }
};

export {
    createApp
}

