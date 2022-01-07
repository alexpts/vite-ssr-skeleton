import {createStore as vuexCreateStore} from 'vuex';
import {rootStore} from './store.js';

export function createStore(params = {}) {
    return vuexCreateStore({...rootStore, ...params});
}
