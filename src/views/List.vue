<style scoped>
    ul {
        /*background: gold;*/
        min-height: 100px;
    }

    .chosen {
        color: red;
    }

    li {
        display: inline-block;
        padding: 4px 16px;
        border: 1px solid #cacccd;
        border-radius: 20px;
        margin-left: 10px;
    }


</style>
<template>
    <div class="list">
        <ul @click="clickHandler">
            <li v-for="item in items">
                {{item.text}}
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data: function () {
            return {
                items: [
                    {text: 'item1'},
                    {text: 'item2'},
                    {text: 'item3'},
                    {text: 'item4'}
                ]
            }
        },
        methods: {
            clickHandler: function (event) {
                let that = event.target,
                        isLi = (/li/ig).test(event.target.localName);
                console.log(that.innerText); //内容
                isLi && $(that).addClass('chosen');
                $(that).siblings('li').removeClass('chosen');

            }
        }
    }
</script>
