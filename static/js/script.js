/**
 * Created by 断崖 on 2016/9/22.
 */

(function ($) {
    var appBody = new Swiper('.app-body', {
        direction: 'vertical',
        scrollContainer: true,
        lazyLoading : true,
        watchSlidesProgress: true,
        loop: false,
        nextButton: '.button-next',
        onInit: function(swiper) {
            swiper.myactive = 0;
        },
        onProgress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides[i];
                if (i == swiper.myactive) {
                    var progress = slide.progress;
                    var translate, boxShadow;
                    translate = progress * swiper.height * 0.8;
                    scale = 1 - Math.min(Math.abs(progress * 0.2), 1);
                    boxShadowOpacity = 0;
                    slide.style.boxShadow = '0px 0px 10px rgba(0,0,0,' + boxShadowOpacity + ')';
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + (translate) + 'px,0) scale(' + scale + ')';
                    es.zIndex=0;
                }else{
                    es = slide.style;
                    es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform ='';
                    es.zIndex=1;
                }
            }
        },
        onTransitionEnd: function(swiper, speed) {
            swiper.myactive = swiper.activeIndex;

            for (var i = 0; i < swiper.slides.length; i++) {
                if(i == swiper.activeIndex){
                    $(swiper.slides[i]).addClass("animate");
                } else {
                    $(swiper.slides[i]).removeClass("animate");
                }
            }
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                es = swiper.slides[i].style;
                es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
            }
        }
    });

    var photoGallery = new Swiper('#photo-gallery', {
        watchSlidesProgress: true,
        loop: true,
        preloadImages: false,
        lazyLoading: true,
        effect: 'coverflow',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : false
        }
    });


    var inviteContent = new Swiper('#invite-content',{
        // scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        // freeModeMomentum : false,
        onSetTransition: function(swiper,translate){
            //translate 一直为0，不可直接用
            var nowTranslate = swiper.translate;

            if(typeof(swiper.beforeTranslate)=="undefined"){
                swiper.beforeTranslate = 0
            }

            if(typeof(swiper.canScroll)=="undefined"){
                swiper.canScroll = 0
            }

            var slideHeight = swiper.slides[0].scrollHeight;
            var swiperHeight = swiper.height;

            if(nowTranslate == 0 && nowTranslate == swiper.beforeTranslate){
                if(swiper.canScroll == 4){
                    appBody.slideTo(0);
                    swiper.canScroll = 0;
                }
                swiper.canScroll += 1;
            }
            else if(slideHeight - swiperHeight + nowTranslate < 1 && nowTranslate <= swiper.beforeTranslate){
                if(swiper.canScroll == 4){
                    appBody.slideTo(2);
                    swiper.canScroll = false;
                }
                swiper.canScroll += 1;
            }
            else {
                swiper.canScroll = 0;
            }
            swiper.beforeTranslate = nowTranslate;
        }

    });

    var commentsBox = new Swiper('#comments-box',{
        // scrollbar: '#comments-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        onSetTransition: function(swiper,translate){
            //translate 一直为0，不可直接用
            var nowTranslate = swiper.translate;

            if(typeof(swiper.beforeTranslate)=="undefined"){
                swiper.beforeTranslate = 0
            }

            if(typeof(swiper.canScroll)=="undefined"){
                swiper.canScroll = 0
            }

            var slideHeight = swiper.slides[0].scrollHeight;
            var swiperHeight = swiper.height;

            if(nowTranslate == 0 && nowTranslate == swiper.beforeTranslate){
                if(swiper.canScroll == 4){
                    appBody.slideTo(3);
                    swiper.canScroll = 0;
                }
                swiper.canScroll += 1;
            }
            // else if(slideHeight - swiperHeight + nowTranslate < 1 && nowTranslate <= swiper.beforeTranslate){
            //     if(swiper.canScroll == 3){
            //         appBody.slideTo(2);
            //         swiper.canScroll = false;
            //     }
            //     swiper.canScroll += 1;
            // }
            else {
                swiper.canScroll = 0;
            }
            swiper.beforeTranslate = nowTranslate;
        }
    });
    window.setInterval(function () {
        commentsBox.updateSlidesSize();
    }, 5000)
})(jQuery);


// 百度地图API功能
(function () {
    var map = new BMap.Map("bd-map");
    var point = new BMap.Point(119.37338, 33.245908);
    var marker = new BMap.Marker(point);  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();

    var infoWindow = new BMap.InfoWindow("<h4 style='margin: 4px 0'>地址：</h4>" +
        "江苏省宝应县茗园天府" +
        "<p style='text-align: center'>恭候您的大驾</p>" +
        "");  // 创建信息窗口对象
    marker.addEventListener("click", function(){
        map.openInfoWindow(infoWindow,point); //开启信息窗口
    });
})();


window.onload = function() {
    document.getElementById("load-mask").className = "hide";
};
