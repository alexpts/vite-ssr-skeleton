import { createSSRApp } from 'vue'
import App from './components/App.vue'
import routerFactory  from './router'
import { createStore, createLogger } from 'vuex'

const createApp = () => {
    const app = createSSRApp(App);
    const router = routerFactory.createRouter();
    const store =  createStore({
        state: {
            count: 4
        },
        mutations: {
            incCount(state) {
                state.count++;
            },
        },
        //plugins: import.meta.env.PROD ? [createLogger()] : [],
        devtools: !import.meta.env.PROD,
    });

    return {
        app: app.use(router).use(store),
        router: router,
        store: store
    }
};

export {
    createApp
}

