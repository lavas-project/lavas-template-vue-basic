/**
 * @file client entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import 'babel-polyfill';
import FastClick from 'fastclick';
import {createApp} from './app';

import 'normalize.css';

FastClick.attach(document.body);

const {app, router} = createApp();

router.onReady(() => {
    app.$mount('#app');
});
