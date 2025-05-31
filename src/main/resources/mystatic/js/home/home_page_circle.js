/**
 * Created by alone on 2025/4/11.
 */
$(function () {
    var time_out;
    var isAnimating = false;
    var isHovered = false;
    var resumeTimeout;
    
    // 初始化自动滚动
    function startAutoSlide() {
        stopAutoSlide(); // 清除之前的定时器
        if (!isHovered && !isAnimating) {
            time_out = setTimeout(moveToRight, 3500);
        }
    }

    // 停止自动滚动
    function stopAutoSlide() {
        clearTimeout(time_out);
        clearTimeout(resumeTimeout);
    }

    // 延迟恢复自动滚动
    function delayedStartAutoSlide() {
        stopAutoSlide();
        resumeTimeout = setTimeout(function() {
            if (!isHovered) {
                startAutoSlide();
            }
        }, 2000); // 2秒后恢复自动滚动
    }

    // 停止所有正在进行的动画
    function stopAllAnimations() {
        $('.current h1, .current p, .current .slide_img').stop(true, true);
        $('.my_slide').stop(true, true);
    }

    // 鼠标悬停时暂停自动滚动
    $('.my_slider').hover(
        function() {
            isHovered = true;
            stopAutoSlide();
        },
        function() {
            isHovered = false;
            delayedStartAutoSlide();
        }
    );

    $('.right_turn').click(function () {
        if (!isAnimating) {
            stopAutoSlide();
            stopAllAnimations();
            isAnimating = true;
            moveToRight();
        }
    });

    $('.left_turn').click(function () {
        if (!isAnimating) {
            stopAutoSlide();
            stopAllAnimations();
            isAnimating = true;
            currentMoveToLeft();
        }
    });

    function moveToRight() {
        stopAutoSlide();
        nextPrepare();
        $('.current h1').animate({left: 250}, 200, function () {
            $('.current p').animate({left: 250}, 200, function () {
                $(this).animate({left: -200, opacity: 0}, 300, function () {
                    $(this).hide(0);
                });
                $('.current .slide_img').animate({left: "70%"}, 200, function () {
                    $('.current .slide_img').animate({left: -200, opacity: 0}, 500, function () {
                        moveToNext();
                        $(this).hide(0);
                    });
                })
            });
            $('.current h1').animate({left: -200, opacity: 0}, 300, function () {
                $(this).hide(0);
            });
        })
    }

    function moveToNext() {
        var temp = $('.current').next();
        if (temp.attr("class") != "my_slide") {
            temp = $('.my_slide:first');
        }
        temp.css({left: "80%"}).show(0).animate({left: "10%", opacity: 1}, 600, function () {
            $('.current').hide(0);
            $('.current').removeClass("current");
            temp.addClass("current").css({"z-index": 0});
            isAnimating = false;
            delayedStartAutoSlide();
        });
    }

    function nextPrepare() {
        var temp = $('.current').next();
        if (temp.attr("class") != "my_slide") {
            temp = $('.my_slide:first');
        }
        temp.css({opacity: 0}).show(0);
        temp.children("h1").css({left: "10%", opacity: 1}).show(0);
        temp.children("p").css({left: "10%", opacity: 1}).show(0);
        temp.children(".slide_img").css({left: "60%", opacity: 1}).show(0);
    }

    function currentMoveToLeft() {
        stopAutoSlide();
        prevPrepare();
        $('.current .slide_img').animate({left: "41%"}, 300, function () {
            $('.current h1').animate({left: "15%"}, 300);
            $('.current p').animate({left: "0%"}, 300, function () {
                $('.current h1').animate({left: "5%"}, 400, function () {
                    $(this).animate({left: "120%", opacity: 0}, 500, function () {
                        $(this).hide(0);
                    });
                });
                $(this).animate({left: "120%", opacity: 0}, 500, function () {
                    $(this).hide(0);
                    moveToPrev();
                });
            });
            $(this).animate({left: "120%", opacity: 0}, 500, function () {
                $(this).hide(0);
            });
        });
    }

    function prevPrepare() {
        var temp = $('.current').prev();
        if (temp.attr("class") != 'my_slide') {
            temp = $('.my_slide:last');
        }
        temp.css({opacity: 0}).show(0);
        temp.children("h1").css({left: "10%", opacity: 1}).show(0);
        temp.children("p").css({left: "10%", opacity: 1}).show(0);
        temp.children(".slide_img").css({left: "60%", opacity: 1}).show(0);
    }

    function moveToPrev() {
        var temp = $('.current').prev();
        if (temp.attr("class") != 'my_slide') {
            temp = $('.my_slide:last');
        }
        temp.css({left: "-70%"}).show(0).animate({left: "10%", opacity: 1}, 500, function () {
            $('.current').hide(0);
            $('.current').removeClass("current");
            temp.addClass("current").css({"z-index": 0});
            isAnimating = false;
            delayedStartAutoSlide();
        });
    }

    $('.buy').click(function () {
        var id = $(this).attr('value');
        $.ajax({
            url:'/insertGoodsCar.do',
            dataType:'JSON',
            type:'post',
            data:{id:id},
            success:function (data) {
                var result = data.result;
                if (result == '2'){
                    alert('您还未登录，请先登录！！！');
                } else if (result == '1'){
                    alert('加入购物车成功');
                } else if (result == '0'){
                    alert('加入购物车失败');
                } else {
                    alert('发生了错误，请检测网络');
                }
            }
        })
    });

    // var host = window.location.host;
    // var websocket = new WebSocket("ws://" + host + "/sockjs/webSocketIMServer");
    // var phone = $('#user_name_a').attr('value');
    // if (phone !== 'wsk') {
    //     websocket.onopen = function () {
    //         console.log("websocket连接上");
    //         websocket.send("start");
    //     };
    //     websocket.onmessage = function (evnt) {
    //         // console.log(evnt.data);
    //         var result = evnt.data;
    //         if (result == "error"){
    //             window.location.href='/logout.do';
    //             alert("该账号在其他地方登录了，请检查是否为本人操作，防止密码丢失！！！");
    //             return;
    //         }
    //         setTimeout(function () {
    //             messageHandle();
    //         }, 2000);
    //     };
    //     websocket.onerror = function () {
    //         console.log("websocket错误");
    //     };
    //     websocket.onclose = function () {
    //         console.log("websocket关闭");
    //     };
    //     function messageHandle() {
    //         // alert(phone);
    //         websocket.send(phone);
    //     };
    // }

    // 初始化自动滚动
    startAutoSlide();
});
