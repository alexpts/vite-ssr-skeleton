import {createStore as vuexCreateStore} from 'vuex';
import {rootStore} from './store.js';

export function createStore(initStoreState, params = {}) {
    let state = initStoreState || params.state || rootStore.state;
    return vuexCreateStore({...rootStore, ...params, state});
}
