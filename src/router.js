import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export function createRouter() {

    const router = new Router({
        mode: 'history',
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            }
            else {
                return { x: 0, y: 0 };
            }
        },
        routes: [
            {
                path: '/',
                name: 'Hello',
                component: Hello
            }
        ]
    });

    return router;

}
