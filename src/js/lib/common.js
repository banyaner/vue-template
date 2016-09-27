//import{qrcode} from 'qrcode';
import {NewsAppClient} from './NewsAppClient'
//var qrcode=require('qrcode-js');
var $commonLandscape, $commonPC, $commonShare, $commonContainer;
//初始化
function init() {
    $commonLandscape = document.getElementById('common-landscape');
    $commonPC = document.getElementById('common-pc');
    $commonShare = document.getElementById('common-share');
    $commonContainer = document.getElementsByClassName('common-container')[0];
}
//通用横屏提示设置
function landscapeSetting() {
    var handler = function () {
        switch (window.orientation) {
            case 0:
            case 180:
                $commonLandscape.style.display = 'none';
                break;
            case -90:
            case 90:
                $commonLandscape.style.display = 'block';
                break;
        }
    };
    handler();
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", handler, false);
}

//通用pc扫码提示设置
function pcSetting() {
    //判断设备类型
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };
    if (!isMobile.any()) { //判断是否为android,BlackBerry,ios,windows
        //new QRCode(document.getElementById('common-pc-center')).makeCode(location.href);
        require(['qrcode-js'], function(qrcode){
            var base64 = qrcode.toDataURL(location.href, 7);
            var imgNode =document.createElement('img');
            imgNode.src=base64;
            document.getElementById('common-pc-center').appendChild(imgNode);
            $commonContainer.style.display = 'none';
            $commonPC.style.display = "block";
        });
    }
}

//通用分享设置
function shareSetting() {
    window.NewsAppShare = {
        shareData: {
            title: '',
            desc: '',
            img_url: '',
            link: ''
        },
        update: function (data) {
            for (var i in data) {
                if (this.shareData.hasOwnProperty(i)) {
                    this.shareData[i] = data[i];
                }
            }
            document.getElementById('__newsapp_sharetext').innerHTML = this.shareData.title + ' ' + this.shareData.link;
            document.getElementById('__newsapp_sharephotourl').innerHTML = this.shareData.img_url;
            document.getElementById('__newsapp_sharewxtitle').innerHTML = this.shareData.title;
            document.getElementById('__newsapp_sharewxtext').innerHTML = this.shareData.desc;
            document.getElementById('__newsapp_sharewxthumburl').innerHTML = this.shareData.img_url;
            document.getElementById('__newsapp_sharewxurl').innerHTML = this.shareData.link;
        },
        show: function () {
            if (NewsAppClient.isNewsApp()) {
                NewsAppClient.share();
            } else {
                $commonShare.className = 'fade-share';
                setTimeout(function () {
                    $commonShare.className = 'hidden';
                }, 2300);
            }
        },
        getAbsPath: function (url) {
            if (url) {
                var a = document.createElement('a');
                a.href = url;
                return a.href;
            } else {
                return location.href.replace(/(\?|#).*/, '');
            }
        }
    };

    //初始化分享数据
    NewsAppShare.update({
        title: '分享标题',
        desc: '分享描述',
        img_url: NewsAppShare.getAbsPath('img/share/share-icon.png'),
        link: NewsAppShare.getAbsPath()
    });

    //微信分享设置
    document.addEventListener('WeixinJSBridgeReady', function () {
        WeixinJSBridge.on('menu:share:timeline', function () {
            WeixinJSBridge.invoke('shareTimeline', NewsAppShare.shareData, function () {
            });
        });
        WeixinJSBridge.on('menu:share:appmessage', function () {
            WeixinJSBridge.invoke('sendAppMessage', NewsAppShare.shareData, function () {
            });
        });
    }, false);
}

//通用容器适配设置
function containerSetting() {
    var clientHeight = document.documentElement.clientHeight;
    var designHeight = parseInt($commonContainer.clientHeight);
    var scale=Math.min(clientHeight / designHeight, 1);
    $commonContainer.style.transform="scale("+scale+")";
    $commonContainer.style.top = (clientHeight - designHeight) / 2 + 'px';
}
//主函数
export var common = function () {
    init();
    landscapeSetting();
    pcSetting();
    shareSetting();
    containerSetting();
}