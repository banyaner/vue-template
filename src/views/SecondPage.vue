<template>
    <div class="page">
        <h1>第二页</h1>
        <p>放置第二页相关组件</p>
        <test></test>
    </div>
</template>
<script>
    import Test from './Test.vue'

    export default {
        data: function () {
            return {
                msg: 'This is a modal!'
            }
        },
        components:{
            test:Test
        }
    }
</script>