import { onServerPrefetch } from 'vue'
import storeSsrModule from './store.js'

const isSSR = import.meta.env.SSR;

/**
 * Plugin for improve SSR and optimize init first state on browser after hydration
 *
 * @param app
 * @param {{}} options
 */
export default function ssrPlugin(app, options) {
    let {router, store} = options

    store.registerModule('ssr', {namespaced: true, ...storeSsrModule}, {preserveState: !!store.state.ssr})

    router.isReady().then(() => {
        let unHook = router.afterEach((to, from, failure) => {
            if (!failure) {
                store.commit(`ssr/resetSsr`);
                unHook();
            }
        })
    })
}


/**
 * @callback initComponent
 * @return {Promise}
 */
class InitComponentHelper {

    /**
     * Wrapper for init state component for SSR and browser
     *
     * @param {initComponent} fn
     * @param store
     * @return {Promise}
     */
    static async init(fn, {store}) {
        if (isSSR) {
            return InitComponentHelper.initSSR(fn);
        }

        // Not run for first page, state was init in SSR, skip first init on browser
        if (store.state.ssr.isSsr) {
            return;
        }

        return InitComponentHelper.initBrowser(fn)
    }

    /**
     * Wrapper for init state component for SSR only
     *
     * @param {initComponent} fn
     * @return {Promise}
     */
    static async initSSR(fn) {
        onServerPrefetch(fn);
    }

    /**
     * Wrapper for init state component for browser only
     *
     * @param {initComponent} fn
     * @return {Promise}
     */
    static async initBrowser(fn) {
        return isSSR ? null : fn();
    }
}

export const {init, initSSR, initBrowser} = InitComponentHelper;
