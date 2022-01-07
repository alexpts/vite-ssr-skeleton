import { createApp } from './main.js'
import { renderToString } from 'vue/server-renderer'

/**
 * @param {string} url
 * @param {{}} manifest
 * @return {Promise<string>}
 */
export async function render(url, manifest) {
    const { app, router } = createApp();

    await router.push(url)
    await router.isReady()

    const context = {}
    return renderToString(app, context)
}
