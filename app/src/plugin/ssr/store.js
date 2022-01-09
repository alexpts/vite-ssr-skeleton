export default {
    state() {
        return {
            isSsr: import.meta.env.SSR === true
        }
    },
    mutations: {
        resetSsr(state) {
            state.isSsr = false
        }
    }
}
