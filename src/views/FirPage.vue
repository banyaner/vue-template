<template>
    <div class="page">
        <h1>首页</h1>
        <p>放置首页相关组件{{msg}}</p>
        <list></list>
        <timer></timer>
    </div>
</template>
<script>
    import List from './List.vue'
    import Slide from './Slide.vue'
    import Timer from './Timer.vue'


    export default {
        data: function() {
            return {
                msg: 'This is a component!'
            }
        },
        components:{
            List,Slide,Timer
        }
    }
</script>
<style lang="sass">
    $red:red;
    h1{
        background: $red;
    }
</style>

