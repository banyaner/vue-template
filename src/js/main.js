import '../css/lib/normalize.css'
import '../css/common.css'
import '../css/index.css'
import Vue from 'vue'
import VueTouch from 'vue-touch'    //需要时引入vue-touch插件
Vue.use(VueTouch)
import FirPage from './../views/FirPage.vue'
import SecPage from './../views/SecPage.vue'
let vm = new Vue({
    el: '#page',
    data: {
        currentView: 'firPage'
    },
    components: {
        FirPage, SecPage
    },
    methods: {
        //切换组件
        showSecPage: function () {
            NewsAppShare.show()
            this.currentView = 'secPage'
            history.pushState({page: this.currentView}, "", location.href);
            console.log(history.state)

        }
    }
});
history.replaceState({page: "firPage"}, "", 'index.html');
window.addEventListener('popstate', function(event) {
    vm.currentView=event.state.page;
});
