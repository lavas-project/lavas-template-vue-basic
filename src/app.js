/**
 * @file entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import Vue from 'vue';
import App from './App.vue';
import {createRouter} from './router.js';

Vue.config.productionTip = false;

/* eslint-disable no-new */

export function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        ...App
    });
    return {app, router};
}
