/**
 * Created by kzw on 2025/5/9.
 */
$(function () {
    //1 注册时忘记密码
    var from_which = 0;
//            !!!!!旋转操作无论如何根据都是根据开始位置！！！
    $('.enter_password').hide(0);
    $('.flip_to_register').bind('click', function () {
        $('.enter_password').show(500);
        css3Transform(document.getElementsByClassName('content')[0], "rotateY(-90deg)");
        $('.forget_password').hide(500);
        refreshVerificationCode('register'); // 添加验证码刷新
    });
    $('.go_to_forget').bind('click', function () {
        $('.enter_password').show(500);
        css3Transform(document.getElementsByClassName('content')[0], "rotateY(90deg)");
        $('.register_page').hide(500);
        refreshVerificationCode('forget'); // 添加验证码刷新
    });

    // ... 保持原有的返回登录等动画代码 ...

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
                    refreshVerificationCode('register'); // 验证码错误时刷新
                } else if (result === 1) {
                    // 成功后执行以下代码进行跳转
                    $('.forget_password').show(1000);
                    css3Transform(document.getElementsByClassName('content')[0], "rotateY(-180deg)");
                    $('.login').hide(1000);
                    $('.confirm_register_button').html('注册');
                }
            },
            error: function() {
                alert('服务器错误，请重试');
                refreshVerificationCode('register');
            }
        });
    });

    // ... 保持原有的密码确认和重置密码逻辑 ...

    // 跳转到重置密码输入
    $('.forget_password_button').bind('click', function () {
        from_which = 2;
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
                    refreshVerificationCode('forget'); // 验证码错误时刷新
                } else if (result === 1) {
                    // 成功后执行以下代码进行跳转
                    $('.register_page').show(1000);
                    css3Transform(document.getElementsByClassName('content')[0], "rotateY(180deg)");
                    $('.login').hide(1000);
                    $('.confirm_register_button').html('重置密码');
                }
            },
            error: function() {
                alert('服务器错误，请重试');
                refreshVerificationCode('forget');
            }
        });
    });

    // ... 保持原有的所有动画相关代码...

    // 添加验证码刷新函数
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
