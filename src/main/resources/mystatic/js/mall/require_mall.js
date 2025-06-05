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

    // 初始化变量
    var currentPage = 1;
    var itemsPerPage = 12;
    var totalPages = 1;

    // 加载求购数据
    function loadWantProducts(page) {
        $.ajax({
            url: '/selectWantByCounts.do',
            type: 'POST',
            dataType: 'JSON',
            data: {
                counts: page
            },
            success: function(data) {
                var container = $('.require_content_div');
                container.empty();

                if (!data || data.length === 0) {
                    if (page > 1) {
                        // 如果当前页没有数据，但不是第一页，回到上一页
                        currentPage--;
                        loadWantProducts(currentPage);
                        return;
                    }
                    // 如果是第一页就没有数据，显示提示信息
                    container.append(
                        "<div class='require_one_part'>" +
                        "<div class='what_info'><span>暂时没有更多求购信息</span></div>" +
                        "</div>"
                    );
                    return;
                }

                updateWantProductDisplay(data);
                // 重新获取总页数，确保分页状态正确
                getTotalPages();
            },
            error: function(xhr, status, error) {
                console.error('Failed to load want products:', error);
                $('.require_content_div').html(
                    "<div class='require_one_part'>" +
                    "<div class='what_info'><span>加载数据时出错</span></div>" +
                    "</div>"
                );
            }
        });
    }

    // 更新求购商品显示
    function updateWantProductDisplay(products) {
        var container = $('.require_content_div');
        container.empty();

        products.forEach(function(product) {
            var productHtml = `
                <div class="require_one_part" id="${product.id}">
                    <div class="what_info">
                        <span>求购：</span>
                        <span>${product.name}</span>
                    </div>
                    <div class="all_info">
                        <span>详情：</span>
                        <span>${product.remark}</span>
                    </div>
                    <div class="what_info">
                        <span>数量：</span>
                        <span>${product.quantity}</span>
                    </div>
                    <div class="what_info">
                        <span>价格：</span>
                        <span>￥${product.price}元</span>
                    </div>
                </div>
            `;
            container.append(productHtml);
        });
    }

    // 更新分页UI
    function updatePagination(currentPage, totalPages) {
        var paginationUl = $('.pagination_div ul');
        paginationUl.empty();

        if (totalPages < 1) {
            $('.pagination_div').hide();
            return;
        }

        $('.pagination_div').show();

        // 计算显示的页码范围
        var startPage = Math.max(1, currentPage - 2);
        var endPage = Math.min(totalPages, startPage + 4);
        
        // 调整startPage确保始终显示5个页码（如果有足够的页数）
        if (endPage - startPage < 4 && totalPages > 5) {
            startPage = Math.max(1, endPage - 4);
        }

        // 添加页码
        for (var i = startPage; i <= endPage; i++) {
            var li = $('<li><a>' + i + '</a></li>');
            if (i === currentPage) {
                li.addClass('current_page');
            }
            paginationUl.append(li);
        }

        // 更新上一页/下一页按钮状态
        if (currentPage === 1) {
            $('.pagination_lt').addClass('disabled');
        } else {
            $('.pagination_lt').removeClass('disabled');
        }

        if (currentPage === totalPages) {
            $('.pagination_gt').addClass('disabled');
        } else {
            $('.pagination_gt').removeClass('disabled');
        }
    }

    // 获取总页数
    function getTotalPages() {
        $.ajax({
            url: '/getWantCounts.do',
            type: 'GET',
            dataType: 'JSON',
            success: function(data) {
                if (data && typeof data.counts === 'number') {
                    totalPages = Math.max(1, Math.ceil(data.counts / itemsPerPage));
                    updatePagination(currentPage, totalPages);
                } else {
                    console.error('Invalid counts data:', data);
                    totalPages = 1;
                    updatePagination(currentPage, totalPages);
                }
            },
            error: function(xhr, status, error) {
                console.error('Failed to get total pages:', error);
                totalPages = 1;
                updatePagination(currentPage, totalPages);
            }
        });
    }

    // 初始化页面
    getTotalPages();
    loadWantProducts(currentPage);

    // 点击页码
    $('.pagination_div ul').on('click', 'li', function() {
        if ($(this).hasClass('current_page')) {
            return;
        }
        var clickedPage = parseInt($(this).text());
        if (clickedPage !== currentPage && clickedPage <= totalPages) {
            currentPage = clickedPage;
            loadWantProducts(currentPage);
            updatePagination(currentPage, totalPages);
        }
    });

    // 上一页
    $('.pagination_lt').click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadWantProducts(currentPage);
            updatePagination(currentPage, totalPages);
        }
    });

    // 下一页
    $('.pagination_gt').click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            loadWantProducts(currentPage);
            updatePagination(currentPage, totalPages);
        }
    });
}); 