<style scoped>
    .bg{
        background: aqua;
        color: white;
    }
</style>
<template>
    <div id="test" class="bg">
        {{msg}}
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return{
                msg: "first template"
            }
        }
    }
</script>