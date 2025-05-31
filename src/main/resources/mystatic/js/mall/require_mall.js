$(function () {
    var type_list = getTypeList();
    
    // 添加延迟变量
    var hoverTimeout;
    
    $('.my_type_div ul li').hover(function () {
        var $particularDiv = $('.particular_type_div');
        clearTimeout(hoverTimeout);
        
        var temp_class = $(this).attr("class");
        if (temp_class == 'type_1') {
            addList(0);
        } else if (temp_class == 'type_2') {
            addList(1);
        } else if (temp_class == 'type_3') {
            addList(2);
        } else if (temp_class == 'type_4') {
            addList(3);
        } else if (temp_class == 'type_5') {
            addList(4);
        } else if (temp_class == 'type_6') {
            addList(5);
        }
        
        $particularDiv.show(0).addClass('show');
        
    }, function() {
        // 鼠标移出时添加延迟
        hoverTimeout = setTimeout(function() {
            hideParticular();
        }, 300);
    });
    
    // 为particular_type_div添加hover事件
    $('.particular_type_div').hover(function() {
        clearTimeout(hoverTimeout);
    }, function() {
        hideParticular();
    });

    function addList(id) {
        var which = type_list[id];
        var my_string = "";
        for (j = 0; j < which.length; j++) {
            var type_i = which[j];
            var arr = type_i.content;
            for (i = 0; i < arr.length; i++) {
                var middleCategory = arr[i];
                var subcategory_list = "";
                if (middleCategory.content && middleCategory.content.length > 0) {
                    for (var k = 0; k < middleCategory.content.length; k++) {
                        var subCategory = middleCategory.content[k];
                        subcategory_list += "<a id='" + subCategory.id + "' class='shop_sort'>" + subCategory.name + "</a>";
                    }
                }
                my_string += "<div class='one_part'><div class='type_title_div'>" +
                    "<span class='type_border_span'>" + (i + 1) + "</span><h3>" + middleCategory.name + "</h3></div><div " +
                    "class='type_goods_list'>" + subcategory_list + "</div></div>";
            }
        }
        $('.particular_type_div').html(my_string);
        
        // 点击事件
        $('.type_goods_list a.shop_sort').click(function() {
            var sort = $(this).attr('id');
            var $require_content = $('.require_content_div');
            $.ajax({
                url: 'selectRequireBySort.do',
                type: 'post',
                dataType: 'JSON',
                data: {sort: sort},
                success: function (data) {
                    $require_content.html('');
                    if (!data || data.length === 0) {
                        $require_content.append("<div class='require_one_part'>" +
                            "<div class='what_info'><span>暂无该分类的求购信息</span></div>" +
                            "</div>");
                        return;
                    }
                    for (var i = 0; i < data.length; i++) {
                        if (!data[i]) continue;
                        $require_content.append(
                            "<div class='require_one_part' id='" + data[i].id + "'>" +
                            "<div class='what_info'>" +
                            "<span>求购：</span>" +
                            "<span>" + data[i].name + "</span>" +
                            "</div>" +
                            "<div class='all_info'>" +
                            "<span>详情：</span>" +
                            "<span>" + data[i].remark + "</span>" +
                            "</div>" +
                            "<div class='what_info'>" +
                            "<span>数量：</span>" +
                            "<span>" + data[i].quantity + "</span>" +
                            "</div>" +
                            "<div class='what_info'>" +
                            "<span>价格：</span>" +
                            "<span>￥" + data[i].price + "元</span>" +
                            "</div>" +
                            "</div>"
                        );
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error fetching data:", error);
                    $require_content.html("<div class='require_one_part'><div class='what_info'><span>加载数据时出错</span></div></div>");
                }
            });
            // 隐藏分类菜单
            hideParticular();
        });
    }
    
    // 隐藏分类菜单的函数
    function hideParticular() {
        $('.particular_type_div').removeClass('show').hide();
    }
}); 