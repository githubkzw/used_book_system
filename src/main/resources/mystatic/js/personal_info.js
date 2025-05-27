// 检查jQuery是否正确加载
if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded!');
} else {
    console.log('jQuery version:', jQuery.fn.jquery);
}

// 等待DOM和jQuery UI完全加载
$(function() {
    console.log('Document ready!');
    
    // 检查jQuery UI是否加载
    if (typeof $.ui === 'undefined') {
        console.error('jQuery UI is not loaded!');
        return;
    }
    
    console.log('Document ready, initializing...'); // 调试日志

    try {
        // 初始化手风琴控件
        $("#accordion").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false
        });
        console.log('Accordion initialized successfully'); // 调试日志
    } catch (e) {
        console.error('Error initializing accordion:', e);
    }

    // 实时监听输入框的变化
    $('.first_info input').on('input propertychange change', function() {
        var val = $(this).val();
        if (val != undefined && val != '') {
            $(this).siblings(".reqiure_enter").hide(0);
        }
    });

    // 使用事件委托来绑定点击事件
    $('#accordion').on('click', '.update_button', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Button clicked!');
        
        var $button = $(this);
        var $container = $button.closest('.info_content');
        var $firstInfo = $container.find('.first_info');
        var $input = $firstInfo.find('input');
        var token = $('.token').val();
        var fieldType = '';
        var value = '';
        
        // 确定要更新的字段类型
        if ($firstInfo.hasClass('sex_info')) {
            fieldType = 'gender';
            var $checkedRadio = $firstInfo.find('input[name="sex_choose"]:checked');
            if (!$checkedRadio.length) {
                alert('请选择性别');
                return;
            }
            value = $checkedRadio.val() === "1" ? "男" : "女";
        } else {
            // 处理其他字段
            value = $input.val();
            if (!value) {
                alert('请输入内容');
                return;
            }
            
            // 根据输入框的class确定字段类型
            if ($input.hasClass('userName')) {
                fieldType = 'userName';
            } else if ($input.hasClass('realName')) {
                fieldType = 'realName';
            } else if ($input.hasClass('sno')) {
                fieldType = 'sno';
            } else if ($input.hasClass('dormitory')) {
                fieldType = 'dormitory';
            } else if ($input.hasClass('email')) {
                fieldType = 'email';
                // 验证邮箱格式
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    alert('请输入正确的邮箱格式');
                    return;
                }
            }
        }
        
        // 构建请求数据
        var data = {
            token: token
        };
        data[fieldType] = value;
        
        console.log('Sending data:', data);
        
        $.ajax({
            url: '/certification.do',
            type: 'post',
            dataType: 'JSON',
            data: data,
            success: function(data) {
                console.log('Server response:', data);
                if (data.result === 1) {
                    // 更新页面显示
                    var $span;
                    switch(fieldType) {
                        case 'userName':
                            $span = $('.username_span');
                            break;
                        case 'realName':
                            $span = $('.realname_span');
                            break;
                        case 'gender':
                            $span = $('.sex_span');
                            break;
                        case 'sno':
                            $span = $('.sno_span');
                            break;
                        case 'dormitory':
                            $span = $('.dormitory_span');
                            break;
                        case 'email':
                            $span = $('.email_span');
                            break;
                    }
                    if ($span) {
                        $span.text(value);
                    }
                    alert('更新成功');
                    // 清空输入框
                    $input.val('');
                    // 关闭当前面板
                    $("#accordion").accordion("option", "active", false);
                } else {
                    alert('更新失败');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error details:', {
                    status: status,
                    error: error,
                    response: xhr.responseText
                });
                alert('更新失败，请稍后重试');
            }
        });
    });

    // 检查提示信息
    if ($('.show_tip').is(':hidden')) {
        var show_tip = $('.show_tip').val();
        if (show_tip) {
            alert('请先认证真实信息！！！！！');
        }
    }
});