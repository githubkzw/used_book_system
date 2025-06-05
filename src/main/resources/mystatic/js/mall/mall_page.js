$(function() {
    // 初始化变量
    var currentPage = 1;
    var itemsPerPage = 12;

    // 加载商品数据
    function loadProducts(page) {
        $.ajax({
            url: '/getShops.do',
            type: 'POST',
            dataType: 'JSON',
            data: {
                start: page
            },
            success: function(data) {
                if (data && data.length > 0) {
                    updateProductDisplay(data);
                }
            },
            error: function() {
                console.error('Failed to load products');
            }
        });
    }

    // 更新商品显示
    function updateProductDisplay(products) {
        var container = $('.product_content_div');
        container.empty();

        products.forEach(function(product) {
            var productHtml = `
                <div class="detail_product">
                    <input type="hidden" value="${product.id}" name="id"/>
                    <div class="product_img_div">
                        <img src="${product.image}" title="${product.name}" class="show_img"/>
                    </div>
                    <p class="show_tip">${product.remark}</p>
                    <span class="detail_product_name" value="${product.id}">${product.name}</span><br/>
                    <span class="detail_product_cost">￥${product.price}元</span><br/>
                    <span class="detail_buy product_1" value="${product.id}">加入购物车</span>
                </div>
            `;
            container.append(productHtml);
        });
    }

    // 更新分页UI
    function updatePagination(currentPage, totalPages) {
        var paginationUl = $('.pagination_div ul');
        paginationUl.empty();

        // 计算显示的页码范围
        var startPage = Math.max(1, currentPage - 2);
        var endPage = Math.min(totalPages, startPage + 4);
        
        // 调整startPage确保始终显示5个页码
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (var i = startPage; i <= endPage; i++) {
            var li = $('<li><a>' + i + '</a></li>');
            if (i === currentPage) {
                li.addClass('current_page');
            }
            paginationUl.append(li);
        }
    }

    // 获取总页数
    function getTotalPages() {
        $.ajax({
            url: '/getShopsCounts.do',
            type: 'GET',
            dataType: 'JSON',
            success: function(data) {
                if (data && data.counts) {
                    var totalPages = Math.ceil(data.counts / itemsPerPage);
                    updatePagination(currentPage, totalPages);
                }
            }
        });
    }

    // 初始化页面
    getTotalPages();
    loadProducts(currentPage);

    // 点击页码
    $('.pagination_div ul').on('click', 'li', function() {
        var clickedPage = parseInt($(this).text());
        if (clickedPage !== currentPage) {
            currentPage = clickedPage;
            loadProducts(currentPage);
            getTotalPages();
        }
    });

    // 上一页
    $('.pagination_lt').click(function() {
        if (currentPage > 1) {
            currentPage--;
            loadProducts(currentPage);
            getTotalPages();
        }
    });

    // 下一页
    $('.pagination_gt').click(function() {
        currentPage++;
        loadProducts(currentPage);
        getTotalPages();
    });
});
