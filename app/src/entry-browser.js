import { createApp } from './main.js'

const { app, router, store } = createApp()
router.isReady().then(() => {
    let isFirst = true;
    router.afterEach(() => {
        if (isFirst) {
            store.commit('isSsrInit', false)
            isFirst = false
        }
    });
    app.mount('#app', true);
})
