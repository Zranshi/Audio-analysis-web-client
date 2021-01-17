import Vue from 'vue'
import App from './App.vue'
// 加载elementUI库
import ElementUI from 'element-ui';
// 加载css资源
import 'element-ui/lib/theme-chalk/index.css';
// 引入vue-router
import VueRouter from 'vue-router';
// 全部引入echart
import * as echarts from 'echart';
import VueResource from 'vue-resource';

Vue.prototype.$echarts = echarts;
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(VueResource);

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        redirect: '/home',
    }, {
        path: '/home',
        component: () => import('@/views/home'),
    },
    ]
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
