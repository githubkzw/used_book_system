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

    // 使用事件委托来绑定点击事件
    $('#accordion').on('click', '.update_button', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        console.log('Button clicked!');
        
        var $button = $(this);
        var $container = $button.closest('.info_content');
        var $firstInfo = $container.find('.first_info');
        var $input = $firstInfo.find('input');
        
        console.log('Input found:', $input.length > 0);
        console.log('Input type:', $input.attr('type'));
        
        if ($input.attr('type') === 'radio') {
            var $checkedRadio = $firstInfo.find('input[name="sex_choose"]:checked');
            if (!$checkedRadio.length) {
                alert('请选择性别');
                return;
            }
            
            var value = $checkedRadio.val();
            var genderText = value === "1" ? "男" : "女";
            var token = $('.token').val();
            
            console.log('Preparing to send:', {
                gender: genderText,
                token: token
            });
            
            $.ajax({
                url: '/certification.do',
                type: 'post',
                dataType: 'JSON',
                data: {
                    gender: genderText,
                    token: token
                },
                success: function(data) {
                    console.log('Server response:', data);
                    if (data.result === 1) {
                        $container.prev().find('.sex_span').text(genderText);
                        alert('更新成功');
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
        }
    });

    // 实时监听输入框的变化
    $('.first_info input').on('input propertychange change', function() {
        var val = $(this).val();
        if (val != undefined && val != '') {
            $(this).siblings(".reqiure_enter").hide(0);
        }
    });

    // 检查提示信息
    if ($('.show_tip').is(':hidden')) {
        var show_tip = $('.show_tip').val();
        if (show_tip) {
            alert('请先认证真实信息！！！！！');
        }
    }
});