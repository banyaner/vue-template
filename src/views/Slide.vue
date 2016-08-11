<template>
    <div class="slide">
        <i class="arrow arrow-left" v-show="leftArrow" @click="preImg">Pre</i>
        <i class="arrow arrow-right" v-show="rightArrow" @click="nextImg">Next</i>
        <div class="cont">
            <h1>{{slides[index].text}}</h1>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                index: 0,
                slides: [
                    {text: 'slide1'},
                    {text: 'slide2'},
                    {text: 'slide3'},
                    {text: 'slide4'},
                    {text: 'slide5'},
                    {text: 'slide6'},
                    {text: 'slide7'},
                    {text: 'slide8'},
                    {text: 'slide9'}
                ]
            }
        },
        computed:{
            'leftArrow':function(){
               return (this.index==0 ||this.index==this.slides.length)?false:true;
            },
            'rightArrow': function(){
                return this.index===(this.slides.length-1)?false:true;
            }
        },
        methods: {
            'nextImg': function () {
                $('.cont').addClass('expand-transition');
                this.index++;
                if (this.index === 9) {
                    this.$dispatch('last-view');
                    this.index=0;
                }
            },
            'preImg': function () {
                this.index--;
            }
        },
        watch: {
            'index': function () {
                $('.cont').removeClass('expand-transition');
            }
        }
    }
</script>
<style lang="sass" scoped>
    .expand-transition {
        transition: all .3s ease;
        height: 60px;
        padding: 10px;
        background-color: #eee;
        opacity: 0;
    }

    .slide{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: azure;
    }
     .arrow{
        display: block;
         position: absolute;
         top: 50%;
         height: 100px;
         margin-top: -50px;

    }
    .arrow-left {
        left: 40px;
    }

    .arrow-right {
       right: 40px;
    }

</style>

