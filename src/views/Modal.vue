<style scoped>
    .modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: black;
        opacity: 0.5;
    }

    .modal-center {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 0 20px;
        margin-top: -200px;
        margin-left: -245px;
        width: 450px;
        height: 400px;
        border-radius:10px;
        background: white;
    }

    .close--circle {
        display: block;
        float: right;
        margin-top: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;

        background-color: silver;
    }

</style>
<template>
    <div v-show="show" class="modal">
        <div class="modal-center">
            <strong class="js-close close--circle" @click="closeModal">X</strong>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                show: false,
                msg: 'This is a modal!'
            }
        },
        methods:{
            closeModal: function () {
                this.show=!this.show;
                console.log(this.show)
            }
        },
        events:{
            'close-modal':function(){
                this.show=!this.show;
            }
        }
    }
</script>