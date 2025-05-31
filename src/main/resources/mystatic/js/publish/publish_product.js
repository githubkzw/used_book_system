/**
 * Created by alone on 2017/5/16.
 */
$(function () {
    var typeList = getTypeList();
    var curFirst = 0;
    var curSecond = 0;
    
    // 初始化分类选择器
    initializeSelects();
    updateSecondSelect();

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
        var getSelect = $(this).children('option:selected').attr("id");
        switch (getSelect) {
            case "type_1": curFirst = 0; break; // 文学与艺术类
            case "type_2": curFirst = 1; break; // 科学与技术类
            case "type_3": curFirst = 2; break; // 人文社科类
            case "type_4": curFirst = 3; break; // 经济与管理类
            case "type_5": curFirst = 4; break; // 生活与休闲类
            case "type_6": curFirst = 5; break; // 教育与学习类
        }
        curSecond = 0;
        updateSecondSelect();
        $(this).blur();
    });

    // 二级分类变化
    $('.choose_second_type').change(function () {
        curSecond = $(this).prop('selectedIndex');
        updateThirdSelect();
        $(this).blur();
    });

    // 初始化分类选择器
    function initializeSelects() {
        var firstSelect = $('.choose_first_type');
        firstSelect.empty();
        
        var mainCategories = [
            {id: 'type_1', name: '文学与艺术类'},
            {id: 'type_2', name: '科学与技术类'},
            {id: 'type_3', name: '人文社科类'},
            {id: 'type_4', name: '经济与管理类'},
            {id: 'type_5', name: '生活与休闲类'},
            {id: 'type_6', name: '教育与学习类'}
        ];
        
        mainCategories.forEach((category, index) => {
            firstSelect.append(
                $('<option>', {
                    id: category.id,
                    text: category.name,
                    selected: index === 0
                })
            );
        });

        updateSecondSelect();
    }

    // 更新二级分类
    function updateSecondSelect() {
        var temp = typeList[curFirst];
        if (!temp || !temp[0]) return;
        
        var secondSelect = $('.choose_second_type');
        secondSelect.empty();
        
        var middleCategories = temp[0].content;
        if (!middleCategories) return;
        
        middleCategories.forEach((category, index) => {
            secondSelect.append(
                $('<option>', {
                    value: category.id,
                    text: category.name,
                    selected: index === curSecond
                })
            );
        });
        
        updateThirdSelect();
    }

    // 更新三级分类
    function updateThirdSelect() {
        var temp = typeList[curFirst];
        if (!temp || !temp[0]) return;
        
        var middleCategories = temp[0].content;
        if (!middleCategories || !middleCategories[curSecond]) return;
        
        var thirdSelect = $('.choose_third_type');
        thirdSelect.empty();
        
        var subCategories = middleCategories[curSecond].content;
        if (!subCategories) {
            thirdSelect.append(
                $('<option>', {
                    value: middleCategories[curSecond].id,
                    text: '无子分类',
                    selected: true
                })
            );
            return;
        }
        
        subCategories.forEach((category, index) => {
            thirdSelect.append(
                $('<option>', {
                    value: category.id,
                    text: category.name,
                    selected: index === 0
                })
            );
        });
    }
});

// 表单验证提示
$(function () {
   if ($('.show_tip').length && !$('.show_tip').is(':visible')) {
       alert("请输入正确的格式！");
   }
});