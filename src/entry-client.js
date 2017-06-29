/**
 * @file client entry
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

import 'babel-polyfill';
import FastClick from 'fastclick';
import {createApp} from './app';

FastClick.attach(document.body);

let {app, router} = createApp();

router.onReady(() => app.$mount('#app'));
