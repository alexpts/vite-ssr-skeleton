import { createSSRApp } from 'vue'
import App from './components/App.vue'
import routerFactory  from './router'

const createApp = () => {
    const app = createSSRApp(App);
    const router = routerFactory.createRouter();

    return {
        app: app.use(router),
        router: router
    }
};

export {
    createApp
}

