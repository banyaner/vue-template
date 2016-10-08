import '../css/lib/normalize.css'
import '../css/common.css'
import '../css/index.css'
import Vue from 'vue'
//import VueTouch from 'vue-touch'    //需要时引入vue-touch插件
//Vue.use(VueTouch) //vue-touch尚未支持vue2.0
import {fixViewport} from './lib/fix-viewport'
import {NewsAppClient} from './lib/NewsAppClient' //TODO:待改写为插件形式，目前只能在用的地方import
import {common} from './lib/common'
import FirPage from './../views/FirPage.vue'
import SecPage from './../views/SecPage.vue'
window.vm = new Vue({
    el: '#page',
    data: {
        currentView: 'firPage'
    },
    components: {
        FirPage, SecPage
    },
    mounted: function () {
        this.$nextTick(function () {
            fixViewport('fixed', 750);
            common();
            console.log(NewsAppClient.isNewsApp())
        });
    },
    //ready: function () {
    //    fixViewport('fixed', 750);
    //    common();
    //    console.log(NewsAppClient.isNewsApp())
    //},
    methods: {
        //切换组件
        showSecPage: function () {
            this.currentView = 'secPage'
            NewsAppShare.show()
            history.pushState({page: this.currentView}, "", location.href);
            console.log(history.state)
        }
    }
});
history.replaceState({page: "firPage"}, "", location.href);
window.addEventListener('popstate', function (event) {
    vm.currentView = event.state.page;
});
