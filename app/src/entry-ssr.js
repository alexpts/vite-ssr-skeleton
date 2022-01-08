import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'

/**
 * @param {string} url
 * @param {{}} manifest
 * @return {Promise<string>}
 */
export async function render(url, manifest) {
    const { app, router, store } = createApp();

    await router.push(url)
    await router.isReady()

    let context = {};

    let html = await renderToString(app, context)
    // Init state for VUEX from server - __INITIAL_STATE__
    html += `<script>window.__VUEX_INIT_STATE__ = ${JSON.stringify(store.state)};</script>`

    return html;
}
