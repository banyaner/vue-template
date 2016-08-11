import Vue from 'vue'
import FirstPage from './src/views/FirstPage.vue'
import SecondPage from './src/views/SecondPage.vue'
import Modal from './src/views/Modal.vue'
import Tip from './src/views/Tip.vue'
let vm = new Vue({
    el: '#page',
    data: {
        currentView: 'firstPage'
    },
    components: {
        firstPage: FirstPage,
        secondPage: SecondPage,
        modal:Modal,
        tip:Tip
    },
    methods: {
        //切换组件
        showNext: function () {
            NewsAppShare.show();
            this.currentView = 'secondPage';
            //显示提示
            this.$broadcast('show-tip','win a golden coin');
            setTimeout(function(){
                vm.$broadcast('close-tip');
            },2000);
        },
        submitInfo: function () {

            //TODO 根据需要填写相关代码

            //可以发送请求
            //关闭模态框
            this.$broadcast('close-modal');

        },
        //记录历史
        recordHash: function () {
            history.pushState({page: this.currentView}, "", location.href);
            console.log(history.state)
        }
    }
});
history.replaceState({page: "firstPage"}, "", 'index.html');
console.log(history.state)
window.addEventListener('popstate', function(event) {
    vm.currentView=event.state.page;
});
