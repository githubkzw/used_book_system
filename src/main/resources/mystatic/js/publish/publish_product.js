/**
 * Created by alone on 2025/5/16.
 */
$(function () {
    // 初始化分类选择器
    initializeSelects();

    // 输入框动画效果
    $('.title_input').bind('focus',function () {
        $(this).animate({width: "60%"}, 500);
    });
    $('.title_input').bind('blur',function () {
        $(this).animate({width: "27%"}, 500);
    });
    $('.detail_textarea').bind('focus',function () {
        $(this).animate({width: "60%", height: "8em"}, 500);
    });
    $('.detail_textarea').bind('blur',function () {
        if ($(this).val() == ''){
            $(this).animate({width: "27%", height: "5em"}, 500);
        }
    });

    // 图片上传预览
    $(".upload_img_input").change(function(){
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $('.show_choose_img').attr("src", objUrl);
            $('.show_choose_img').css({opacity: 0});
            $('.show_choose_img').show(0).animate({opacity:1},1000);
        }
    });

    // 获取图片的url
    function getObjectURL(file) {
        if (!file) return null;
        return URL.createObjectURL(file);
    }

    // 一级分类变化
    $('.choose_first_type').change(function () {
        var id = $(this).find(':selected').attr('id').replace('type_', '');
        loadSecondCategories(id);
        $(this).blur();
    });

    // 二级分类变化
    $('.choose_second_type').change(function () {
        var id = $(this).val();
        loadThirdCategories(id);
        $(this).blur();
    });

    // 初始化分类选择器
    function initializeSelects() {
        // 一级分类已经在HTML中静态定义
        // 加载默认选中的一级分类对应的二级分类
        var firstSelectedId = $('.choose_first_type').find(':selected').attr('id').replace('type_', '');
        loadSecondCategories(firstSelectedId);
    }

    // 加载二级分类
    function loadSecondCategories(aid) {
        $.ajax({
            url: '/getClassification.do',
            type: 'POST',
            dataType: 'JSON',
            data: {id: aid},
            success: function(result) {
                var secondSelect = $('.choose_second_type');
                secondSelect.empty();
                
                result.forEach(function(category) {
                    secondSelect.append(
                        $('<option>', {
                            value: category.id,
                            text: category.name
                        })
                    );
                });
                
                // 加载新选中的二级分类对应的三级分类
                loadThirdCategories(secondSelect.val());
            }
        });
    }

    // 加载三级分类
    function loadThirdCategories(cid) {
        $.ajax({
            url: '/getSpecific.do',
            type: 'POST',
            dataType: 'JSON',
            data: {id: cid},
            success: function(result) {
                var thirdSelect = $('.choose_third_type');
                thirdSelect.empty();
                
                result.forEach(function(category) {
                    thirdSelect.append(
                        $('<option>', {
                            value: category.id,
                            text: category.name
                        })
                    );
                });
            }
        });
    }
});

// 表单验证提示
$(function () {
   if ($('.show_tip').length && !$('.show_tip').is(':visible')) {
       alert("请输入正确的格式！");
   }
});