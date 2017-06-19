/**
 * @file client entry
 */

import FastClick from 'fastclick';
import {createApp} from './app';

import 'normalize.css';

FastClick.attach(document.body);

const {app, router} = createApp();

router.onReady(() => {
    app.$mount('#app');
});
