<template>
    <div class="tip" v-if="showTip" transition="fadeInUp">
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default{
        data: function () {
            return {
                showTip: false,
                msg: 'congratulations!!!'
            }
        },
        events: {
            'show-tip': function (res) {
                this.showTip = true;
                this.msg = res;
            },
            'close-tip': function () {
                this.showTip = false;
            }
        }
    }
</script>
<style>
    .tip {
        position: absolute;
        bottom: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -140px;
        height: 100px;
        width: 240px;
        padding: 20px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        text-align: center;
        background: black;
        color: white;
        opacity: 0.6;
    }

    @-webkit-keyframes fadeInUp {
        0% {
            opacity: 0;
            bottom: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        40%, 80% {
            opacity: 1;
            bottom: 50%;
            -webkit-transform: none;
            transform: none;
        }
        100% {
            opacity: 0;
            -webkit-transform: none;
            transform: none;
        }

    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            bottom: 0;
        }

        40%, 70% {
            opacity: 0.6;
            bottom: 50%;
            -webkit-transform: none;
            transform: none;
        }
        100% {
            opacity: 0;
            -webkit-transform: none;
            transform: none;
        }

    }

    .fadeInUp-transition {
        -webkit-animation-name: fadeInUp;
        animation-name: fadeInUp;
        -webkit-animation-duration: 2s;
        animation-duration: 2s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
    }
</style>
