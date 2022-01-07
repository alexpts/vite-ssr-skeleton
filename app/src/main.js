import { createSSRApp } from 'vue'
import App from './components/App.vue'
import routerFactory  from './router'
import { createStore } from './store';

const createApp = () => {
    const app = createSSRApp(App);
    const router = routerFactory.createRouter();
    const store = createStore({});

    return {
        app: app.use(router).use(store),
        router: router,
        store: store
    }
};

export {
    createApp
}

