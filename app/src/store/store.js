export const COMMIT_COUNT_INCREMENT = 'incCount';

export const rootStore = {
    state: {
        count: 4
    },
    mutations: {
        setCount(state, value) {
            state.count = value;
        },
        [COMMIT_COUNT_INCREMENT](state) {
            state.count += 1;
        }
    },
    devtools: !import.meta.env.PROD,
    strict: !import.meta.env.PROD
}

