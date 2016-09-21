<template>
    <div class="page">
        <h1>首页</h1>
        <h3>{{msg}}</h3>
        <input type="button" v-touch:tap="showModal" value="显示遮罩层"/>
        <list></list>
        <timer></timer>
        <modal></modal>

    </div>
</template>
<script>
    import List from './List.vue'
    import Timer from './Timer.vue'
    import Modal from './Modal.vue'

    export default {
        data: function(){
            return {
                msg: '放置首页相关组件'
            }
        },
        components:{
            List, Timer, Modal
        },
        methods:{
            'showModal': function(){
                this.$broadcast('show-modal')
            }
        }
    }
</script>
<style lang="sass" scoped>
    $red:red;
    h1{
        background: $red;
    }
    input{
        border: 1px solid #eff1f5;
        padding: 10px;
        height: 50px;
        border-radius: 10px;
    }
    input:hover{
        font-weight: bolder;
    }
</style>

