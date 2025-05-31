-- 清空并重建分类数据
TRUNCATE TABLE `allkinds`;
TRUNCATE TABLE `classification`;
TRUNCATE TABLE `specifickinds`;

-- 插入第一层分类（大类）
INSERT INTO `allkinds` VALUES (1, '文学与艺术类', NOW());
INSERT INTO `allkinds` VALUES (2, '科学与技术类', NOW());
INSERT INTO `allkinds` VALUES (3, '人文社科类', NOW());
INSERT INTO `allkinds` VALUES (4, '经济与管理类', NOW());
INSERT INTO `allkinds` VALUES (5, '生活与休闲类', NOW());
INSERT INTO `allkinds` VALUES (6, '教育与学习类', NOW());

-- 插入第二层分类（中类）
-- 文学与艺术类
INSERT INTO `classification` VALUES (1, '小说', NOW(), 1);
INSERT INTO `classification` VALUES (2, '诗歌', NOW(), 1);
INSERT INTO `classification` VALUES (3, '戏剧', NOW(), 1);
INSERT INTO `classification` VALUES (4, '散文随笔', NOW(), 1);
INSERT INTO `classification` VALUES (5, '文学理论与批评', NOW(), 1);

-- 科学与技术类
INSERT INTO `classification` VALUES (6, '自然科学', NOW(), 2);
INSERT INTO `classification` VALUES (7, '工程技术', NOW(), 2);
INSERT INTO `classification` VALUES (8, '计算机科学', NOW(), 2);
INSERT INTO `classification` VALUES (9, '医学健康', NOW(), 2);
INSERT INTO `classification` VALUES (10, '数学', NOW(), 2);

-- 人文社科类
INSERT INTO `classification` VALUES (11, '历史', NOW(), 3);
INSERT INTO `classification` VALUES (12, '哲学', NOW(), 3);
INSERT INTO `classification` VALUES (13, '心理学', NOW(), 3);
INSERT INTO `classification` VALUES (14, '社会学', NOW(), 3);
INSERT INTO `classification` VALUES (15, '政治法律', NOW(), 3);

-- 经济与管理类
INSERT INTO `classification` VALUES (16, '经济学', NOW(), 4);
INSERT INTO `classification` VALUES (17, '金融投资', NOW(), 4);
INSERT INTO `classification` VALUES (18, '企业管理', NOW(), 4);
INSERT INTO `classification` VALUES (19, '会计审计', NOW(), 4);
INSERT INTO `classification` VALUES (20, '创业创新', NOW(), 4);

-- 生活与休闲类
INSERT INTO `classification` VALUES (21, '美食烹饪', NOW(), 5);
INSERT INTO `classification` VALUES (22, '旅行指南', NOW(), 5);
INSERT INTO `classification` VALUES (23, '家居生活', NOW(), 5);
INSERT INTO `classification` VALUES (24, '运动健身', NOW(), 5);
INSERT INTO `classification` VALUES (25, '时尚美容', NOW(), 5);

-- 教育与学习类
INSERT INTO `classification` VALUES (26, '语言学习', NOW(), 6);
INSERT INTO `classification` VALUES (27, '考试辅导', NOW(), 6);
INSERT INTO `classification` VALUES (28, '教材教辅', NOW(), 6);
INSERT INTO `classification` VALUES (29, '学习方法', NOW(), 6);
INSERT INTO `classification` VALUES (30, '儿童教育', NOW(), 6);

-- 插入第三层分类（小类）
-- 文学与艺术类-小说
INSERT INTO `specifickinds` VALUES (1, '言情小说', NOW(), 1);
INSERT INTO `specifickinds` VALUES (2, '科幻小说', NOW(), 1);
INSERT INTO `specifickinds` VALUES (3, '悬疑小说', NOW(), 1);
INSERT INTO `specifickinds` VALUES (4, '历史小说', NOW(), 1);
INSERT INTO `specifickinds` VALUES (5, '武侠小说', NOW(), 1);

-- 文学与艺术类-诗歌
INSERT INTO `specifickinds` VALUES (6, '古典诗词', NOW(), 2);
INSERT INTO `specifickinds` VALUES (7, '现代诗歌', NOW(), 2);
INSERT INTO `specifickinds` VALUES (8, '外国诗歌', NOW(), 2);

-- 文学与艺术类-戏剧
INSERT INTO `specifickinds` VALUES (9, '话剧剧本', NOW(), 3);
INSERT INTO `specifickinds` VALUES (10, '戏曲剧本', NOW(), 3);
INSERT INTO `specifickinds` VALUES (11, '影视剧本', NOW(), 3);

-- 文学与艺术类-散文随笔
INSERT INTO `specifickinds` VALUES (12, '生活随笔', NOW(), 4);
INSERT INTO `specifickinds` VALUES (13, '旅行散文', NOW(), 4);
INSERT INTO `specifickinds` VALUES (14, '哲理散文', NOW(), 4);

-- 文学与艺术类-文学理论与批评
INSERT INTO `specifickinds` VALUES (15, '文学史', NOW(), 5);
INSERT INTO `specifickinds` VALUES (16, '文学批评方法', NOW(), 5);
INSERT INTO `specifickinds` VALUES (17, '作家研究', NOW(), 5);

-- 科学与技术类-自然科学
INSERT INTO `specifickinds` VALUES (18, '物理学', NOW(), 6);
INSERT INTO `specifickinds` VALUES (19, '化学', NOW(), 6);
INSERT INTO `specifickinds` VALUES (20, '生物学', NOW(), 6);
INSERT INTO `specifickinds` VALUES (21, '天文学', NOW(), 6);

-- 科学与技术类-工程技术
INSERT INTO `specifickinds` VALUES (22, '机械工程', NOW(), 7);
INSERT INTO `specifickinds` VALUES (23, '电子工程', NOW(), 7);
INSERT INTO `specifickinds` VALUES (24, '建筑工程', NOW(), 7);

-- 科学与技术类-计算机科学
INSERT INTO `specifickinds` VALUES (25, '编程语言', NOW(), 8);
INSERT INTO `specifickinds` VALUES (26, '人工智能', NOW(), 8);
INSERT INTO `specifickinds` VALUES (27, '网络安全', NOW(), 8);

-- 科学与技术类-医学健康
INSERT INTO `specifickinds` VALUES (28, '临床医学', NOW(), 9);
INSERT INTO `specifickinds` VALUES (29, '营养健康', NOW(), 9);
INSERT INTO `specifickinds` VALUES (30, '中医养生', NOW(), 9);

-- 科学与技术类-数学
INSERT INTO `specifickinds` VALUES (31, '基础数学', NOW(), 10);
INSERT INTO `specifickinds` VALUES (32, '应用数学', NOW(), 10);
INSERT INTO `specifickinds` VALUES (33, '统计学', NOW(), 10);

-- 人文社科类-历史
INSERT INTO `specifickinds` VALUES (34, '中国史', NOW(), 11);
INSERT INTO `specifickinds` VALUES (35, '世界史', NOW(), 11);
INSERT INTO `specifickinds` VALUES (36, '考古学', NOW(), 11);

-- 人文社科类-哲学
INSERT INTO `specifickinds` VALUES (37, '中国哲学', NOW(), 12);
INSERT INTO `specifickinds` VALUES (38, '西方哲学', NOW(), 12);
INSERT INTO `specifickinds` VALUES (39, '伦理学', NOW(), 12);

-- 人文社科类-心理学
INSERT INTO `specifickinds` VALUES (40, '发展心理学', NOW(), 13);
INSERT INTO `specifickinds` VALUES (41, '临床心理学', NOW(), 13);
INSERT INTO `specifickinds` VALUES (42, '认知心理学', NOW(), 13);

-- 人文社科类-社会学
INSERT INTO `specifickinds` VALUES (43, '社会理论', NOW(), 14);
INSERT INTO `specifickinds` VALUES (44, '社会问题研究', NOW(), 14);

-- 人文社科类-政治法律
INSERT INTO `specifickinds` VALUES (45, '政治理论', NOW(), 15);
INSERT INTO `specifickinds` VALUES (46, '国际关系', NOW(), 15);
INSERT INTO `specifickinds` VALUES (47, '法律法规', NOW(), 15);

-- 经济与管理类-经济学
INSERT INTO `specifickinds` VALUES (48, '宏观经济学', NOW(), 16);
INSERT INTO `specifickinds` VALUES (49, '微观经济学', NOW(), 16);
INSERT INTO `specifickinds` VALUES (50, '经济史', NOW(), 16);

-- 经济与管理类-金融投资
INSERT INTO `specifickinds` VALUES (51, '股票投资', NOW(), 17);
INSERT INTO `specifickinds` VALUES (52, '基金理财', NOW(), 17);
INSERT INTO `specifickinds` VALUES (53, '风险管理', NOW(), 17);

-- 经济与管理类-企业管理
INSERT INTO `specifickinds` VALUES (54, '战略管理', NOW(), 18);
INSERT INTO `specifickinds` VALUES (55, '人力资源管理', NOW(), 18);
INSERT INTO `specifickinds` VALUES (56, '市场营销', NOW(), 18);

-- 经济与管理类-会计审计
INSERT INTO `specifickinds` VALUES (57, '财务会计', NOW(), 19);
INSERT INTO `specifickinds` VALUES (58, '管理会计', NOW(), 19);
INSERT INTO `specifickinds` VALUES (59, '审计学', NOW(), 19);

-- 经济与管理类-创业创新
INSERT INTO `specifickinds` VALUES (60, '创业指导', NOW(), 20);
INSERT INTO `specifickinds` VALUES (61, '商业模式', NOW(), 20);
INSERT INTO `specifickinds` VALUES (62, '创新管理', NOW(), 20);

-- 生活与休闲类-美食烹饪
INSERT INTO `specifickinds` VALUES (63, '中餐烹饪', NOW(), 21);
INSERT INTO `specifickinds` VALUES (64, '西餐烘焙', NOW(), 21);
INSERT INTO `specifickinds` VALUES (65, '饮食文化', NOW(), 21);

-- 生活与休闲类-旅行指南
INSERT INTO `specifickinds` VALUES (66, '国内旅行', NOW(), 22);
INSERT INTO `specifickinds` VALUES (67, '境外旅行', NOW(), 22);
INSERT INTO `specifickinds` VALUES (68, '探险旅行', NOW(), 22);

-- 生活与休闲类-家居生活
INSERT INTO `specifickinds` VALUES (69, '室内设计', NOW(), 23);
INSERT INTO `specifickinds` VALUES (70, '园艺种植', NOW(), 23);
INSERT INTO `specifickinds` VALUES (71, '宠物养护', NOW(), 23);

-- 生活与休闲类-运动健身
INSERT INTO `specifickinds` VALUES (72, '健身训练', NOW(), 24);
INSERT INTO `specifickinds` VALUES (73, '瑜伽冥想', NOW(), 24);
INSERT INTO `specifickinds` VALUES (74, '球类运动', NOW(), 24);

-- 生活与休闲类-时尚美容
INSERT INTO `specifickinds` VALUES (75, '服装搭配', NOW(), 25);
INSERT INTO `specifickinds` VALUES (76, '美容护肤', NOW(), 25);
INSERT INTO `specifickinds` VALUES (77, '发型设计', NOW(), 25);

-- 教育与学习类-语言学习
INSERT INTO `specifickinds` VALUES (78, '英语学习', NOW(), 26);
INSERT INTO `specifickinds` VALUES (79, '小语种学习', NOW(), 26);
INSERT INTO `specifickinds` VALUES (80, '汉语学习', NOW(), 26);

-- 教育与学习类-考试辅导
INSERT INTO `specifickinds` VALUES (81, '升学考试', NOW(), 27);
INSERT INTO `specifickinds` VALUES (82, '职业资格考试', NOW(), 27);
INSERT INTO `specifickinds` VALUES (83, '语言考试', NOW(), 27);

-- 教育与学习类-教材教辅
INSERT INTO `specifickinds` VALUES (84, '中小学教材', NOW(), 28);
INSERT INTO `specifickinds` VALUES (85, '大学教材', NOW(), 28);
INSERT INTO `specifickinds` VALUES (86, '参考书', NOW(), 28);

-- 教育与学习类-学习方法
INSERT INTO `specifickinds` VALUES (87, '阅读方法', NOW(), 29);
INSERT INTO `specifickinds` VALUES (88, '记忆技巧', NOW(), 29);
INSERT INTO `specifickinds` VALUES (89, '思维训练', NOW(), 29);

-- 教育与学习类-儿童教育
INSERT INTO `specifickinds` VALUES (90, '早期教育', NOW(), 30);
INSERT INTO `specifickinds` VALUES (91, '亲子关系', NOW(), 30);
INSERT INTO `specifickinds` VALUES (92, '特殊教育', NOW(), 30);

-- 更新现有商品的分类到新的分类体系
UPDATE `shopinformation` SET sort = 1 WHERE sort > 92 OR sort IS NULL;

-- 更新分类ID
UPDATE `shopinformation` SET sort = 
    CASE 
        WHEN sort > 92 THEN 1  -- 超出范围的设为言情小说
        ELSE sort              -- 在范围内的保持不变
    END;

-- 添加新的商品分类约束（如果不存在）
SET @constraint_exists = (
    SELECT COUNT(*)
    FROM information_schema.table_constraints
    WHERE table_name = 'shopinformation'
    AND constraint_name = 'fk_shop_sort'
);

SET @sql = IF(@constraint_exists = 0,
    'ALTER TABLE `shopinformation` ADD CONSTRAINT `fk_shop_sort` 
    FOREIGN KEY (`sort`) REFERENCES `specifickinds` (`id`) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE',
    'SELECT "Constraint already exists"'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt; 