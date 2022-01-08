import http from '../service/http.js';

export const COMMIT_COUNT_INCREMENT = 'incCount';

export const rootStore = {
    state() {
        return {
            count: 4,
            posts: [],
            isSsrInit: true, // до первого перехода route
        }
    },
    mutations: {
        isSsrInit(state, isSsr = true) {
            state.isSsrInit = isSsr
        },
        setCount(state, value) {
            state.count = value
        },
        [COMMIT_COUNT_INCREMENT](state) {
            state.count += 1;
        },
        /**
         * @param {{}} state
         * @param {{}[]} posts
         */
        setPosts(state, posts) {
            state.posts = posts;
        }
    },
    actions: {
        async ['test/fetch'](context) {
            const {data, status, headers} = await http.get('https://jsonplaceholder.typicode.com/users');
            context.commit('setPosts', data);
            return { body: data, status, headers };
        }
    },
    devtools: !import.meta.env.PROD,
    strict: !import.meta.env.PROD
}

