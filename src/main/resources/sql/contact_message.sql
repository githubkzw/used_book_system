-- 联系我们表
CREATE TABLE IF NOT EXISTS contact_message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL COMMENT '姓名',
    email VARCHAR(100) NOT NULL COMMENT '电子邮箱',
    message TEXT NOT NULL COMMENT '留言内容',
    status TINYINT DEFAULT 0 COMMENT '处理状态：0-未处理, 1-已读, 2-已回复',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='联系我们表单数据'; 