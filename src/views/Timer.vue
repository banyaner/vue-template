<!--毫秒计时器-->
<style scoped>

</style>
<template>
    <div class="timer" class="bg">
        <input @click="beginTiming" type="button" value="开始计时"/>
        <input @click="stopTiming" type="button" value="停止计时"/>

        <p>{{time}}</p>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                timer: '',
                time: '00:00'
            }
        },
        methods: {
            'beginTiming': function () {
                let m = '00',
                        das = '00',
                        that = this;
                this.timer = setInterval(function () {
                    das = parseInt(das);
                    das += 1;
                    if (das < 100) {
                        if (das < 10) {
                            das = '0' + das;
                        }
                    } else {
                        das = 0;
                        m = parseInt(m);
                        m += 1;
                        if (m < 10) {
                            m = '0' + m;
                        }
                    }
                    that.time = m + '.' + das;
                    console.log(that.time);
                }, 10);
            },
            'stopTiming': function () {
                clearTimeout(this.timer)
            }
        }
    }
</script>