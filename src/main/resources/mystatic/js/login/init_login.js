/**
 * Created by kzw on 2025/5/9.
 */
$(function () {
    // 定义css3Transform函数
    function css3Transform(element, value) {
        var arrPriex = ["transform", "webkitTransform", "mozTransform", "msTransform", "oTransform"];
        for(var i = 0; i < arrPriex.length; i++) {
            element.style[arrPriex[i]] = value;
        }
    }
    
    //1 注册时忘记密码
    var from_which = 0;
    
    // 初始化时隐藏不需要的页面
    $('.enter_password').hide();
    $('.register_page').hide();
    $('.forget_password').hide();

    // 点击注册按钮
    $('.flip_to_register').bind('click', function () {
        $('.login').fadeOut(300, function() {
            $('.register_page').fadeIn(300);
        css3Transform(document.getElementsByClassName('content')[0], "rotateY(-90deg)");
        });
        $('.forget_password').hide();
        $('.enter_password').hide();
        refreshVerificationCode('register');
    });

    // 点击忘记密码
    $('.go_to_forget').bind('click', function () {
        $('.login').fadeOut(300, function() {
            $('.forget_password').fadeIn(300);
        css3Transform(document.getElementsByClassName('content')[0], "rotateY(90deg)");
        });
        $('.register_page').hide();
        $('.enter_password').hide();
        refreshVerificationCode('forget');
    });

    // 返回登录
    $('.go_back_login, .go_back_login_from_forget').bind('click', function () {
        $('.register_page').fadeOut(300);
        $('.forget_password').fadeOut(300);
        $('.enter_password').fadeOut(300, function() {
            $('.login').fadeIn(300);
            css3Transform(document.getElementsByClassName('content')[0], "rotateY(0deg)");
        });
    });

    // 跳转到注册输入密码
    $('.go_enter_password_button').bind('click', function () {
        from_which = 1;
        var name = $('.input_nickname').val();
        var phone = $('.register_input_phone').val();
        var code = $('.register_input_vcode').val();
        var token = $('.token').val();

        if (name === '') {
            alert('用户名不能为空');
            return;
        }
        if (phone === '') {
            alert('手机号不能为空');
            return;
        }
        if (!/^1[3-9]\d{9}$/.test(phone)) {
            alert('请输入正确的手机号');
            return;
        }
        if (code === '') {
            alert('验证码不能为空');
            return;
        }

        $.ajax({
            url: 'checkPhoneCode.do',
            dataType: 'JSON',
            type: 'post',
            data: {name: name, phone: phone, code: code, token: token},
            success: function (data) {
                var result = data.result;
                if (result === 0) {
                    alert('验证码错误');
                    refreshVerificationCode('register');
                } else if (result === -1) {
                    alert('手机号已被注册');
                    refreshVerificationCode('register');
                } else if (result === 1) {
                    $('.register_page').fadeOut(300);
                    $('.login').hide();
                    $('.forget_password').hide();
                    $('.enter_password').fadeIn(300, function() {
                    css3Transform(document.getElementsByClassName('content')[0], "rotateY(-180deg)");
                    });
                    $('.confirm_register_button').html('注册');
                }
            },
            error: function() {
                alert('服务器错误，请重试');
                refreshVerificationCode('register');
            }
        });
    });

    // 忘记密码按钮
    $('.forget_password_button').bind('click', function () {
        var phone = $('.forget_input_phone').val();
        var code = $('.forget_input_vcode').val();
        var token = $('.token').val();

        if (phone === '') {
            alert('手机号不能为空');
            return;
        }
        if (!/^1[3-9]\d{9}$/.test(phone)) {
            alert('请输入正确的手机号');
            return;
        }
        if (code === '') {
            alert('验证码不能为空');
            return;
        }

        $.ajax({
            url: 'checkPhoneCode.do',
            dataType: 'JSON',
            type: 'post',
            data: {phone: phone, code: code, token: token},
            success: function (data) {
                var result = data.result;
                if (result === 0) {
                    alert('验证码错误');
                    refreshVerificationCode('forget');
                } else if (result === 1) {
                    $('.forget_password').fadeOut(300);
                    $('.login').hide();
                    $('.register_page').hide();
                    $('.enter_password').fadeIn(300, function() {
                    css3Transform(document.getElementsByClassName('content')[0], "rotateY(180deg)");
                    });
                    $('.confirm_register_button').html('重置密码');
                }
            },
            error: function() {
                alert('服务器错误，请重试');
                refreshVerificationCode('forget');
            }
        });
    });

    // 注册/重置密码按钮点击事件
    $('.confirm_register_button').bind('click', function() {
        var password = $('.first_enter_password_input').val();
        var confirmPassword = $('.confirm_password_input').val();
        var token = $('.token').val();

        if (password === '') {
            alert('密码不能为空');
            return;
        }
        if (confirmPassword === '') {
            alert('确认密码不能为空');
            return;
        }
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致');
            return;
        }
        if (password.length < 6) {
            alert('密码长度不能少于6位');
            return;
        }

        // 根据按钮文本判断是注册还是重置密码
        var isReset = $(this).html() === '重置密码';
        
        $.ajax({
            url: isReset ? 'updatePassword.do' : 'insertUser.do',
            type: 'post',
            dataType: 'JSON',
            data: {
                password: password,
                token: token
            },
            success: function(data) {
                if (data.success) {
                    alert(isReset ? '密码重置成功！' : '注册成功！');
                    window.location.href = '/';
                } else {
                    if (data.message) {
                        alert(data.message);
                    } else {
                        alert(isReset ? '密码重置失败，请重试' : '注册失败，请重试');
                    }
                    refreshVerificationCode(isReset ? 'forget' : 'register');
                }
            },
            error: function() {
                alert('服务器错误，请重试');
                refreshVerificationCode(isReset ? 'forget' : 'register');
            }
        });
    });

    // 验证码刷新函数
    function refreshVerificationCode(type) {
        $.get('/getVerificationCode.do', function(data) {
            if(type === 'register') {
                $('#registerVerificationCodeImg').attr('src', 'data:image/png;base64,' + data.image);
            } else {
                $('#forgetVerificationCodeImg').attr('src', 'data:image/png;base64,' + data.image);
            }
        });
    }

    // 页面加载时获取验证码
    refreshVerificationCode('register');
    refreshVerificationCode('forget');

    // 点击验证码图片刷新
    $('#registerVerificationCodeImg').click(function() {
        refreshVerificationCode('register');
    });

    $('#forgetVerificationCodeImg').click(function() {
        refreshVerificationCode('forget');
    });
});
