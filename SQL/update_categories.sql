-- 清除旧数据
DELETE FROM `specifickinds`;
DELETE FROM `classification` WHERE id > 5;

-- 更新中分类数据
INSERT INTO `classification` VALUES (6, '自然科学', '2025-05-29 10:21:34', 2);
INSERT INTO `classification` VALUES (7, '工程技术', '2025-05-29 10:21:34', 2);
INSERT INTO `classification` VALUES (8, '计算机科学', '2025-05-29 10:21:34', 2);
INSERT INTO `classification` VALUES (9, '医学健康', '2025-05-29 10:21:34', 2);
INSERT INTO `classification` VALUES (10, '数学', '2025-05-29 10:21:34', 2);

INSERT INTO `classification` VALUES (11, '历史', '2025-05-29 10:21:34', 3);
INSERT INTO `classification` VALUES (12, '哲学', '2025-05-29 10:21:34', 3);
INSERT INTO `classification` VALUES (13, '心理学', '2025-05-29 10:21:34', 3);
INSERT INTO `classification` VALUES (14, '社会学', '2025-05-29 10:21:34', 3);
INSERT INTO `classification` VALUES (15, '政治法律', '2025-05-29 10:21:34', 3);

INSERT INTO `classification` VALUES (16, '经济学', '2025-05-29 10:21:34', 4);
INSERT INTO `classification` VALUES (17, '金融投资', '2025-05-29 10:21:34', 4);
INSERT INTO `classification` VALUES (18, '企业管理', '2025-05-29 10:21:34', 4);
INSERT INTO `classification` VALUES (19, '会计审计', '2025-05-29 10:21:34', 4);
INSERT INTO `classification` VALUES (20, '创业创新', '2025-05-29 10:21:34', 4);

INSERT INTO `classification` VALUES (21, '美食烹饪', '2025-05-29 10:21:34', 5);
INSERT INTO `classification` VALUES (22, '旅行指南', '2025-05-29 10:21:34', 5);
INSERT INTO `classification` VALUES (23, '家居生活', '2025-05-29 10:21:34', 5);
INSERT INTO `classification` VALUES (24, '运动健身', '2025-05-29 10:21:34', 5);
INSERT INTO `classification` VALUES (25, '时尚美容', '2025-05-29 10:21:34', 5);

INSERT INTO `classification` VALUES (26, '语言学习', '2025-05-29 10:21:34', 6);
INSERT INTO `classification` VALUES (27, '考试辅导', '2025-05-29 10:21:34', 6);
INSERT INTO `classification` VALUES (28, '教材教辅', '2025-05-29 10:21:34', 6);
INSERT INTO `classification` VALUES (29, '学习方法', '2025-05-29 10:21:34', 6);
INSERT INTO `classification` VALUES (30, '儿童教育', '2025-05-29 10:21:34', 6);

-- 更新小分类数据
-- 文学与艺术类的小分类
INSERT INTO `specifickinds` VALUES (1, '言情小说', '2025-05-29 10:27:26', 1);
INSERT INTO `specifickinds` VALUES (2, '科幻小说', '2025-05-29 10:27:26', 1);
INSERT INTO `specifickinds` VALUES (3, '悬疑小说', '2025-05-29 10:27:26', 1);
INSERT INTO `specifickinds` VALUES (4, '历史小说', '2025-05-29 10:27:26', 1);
INSERT INTO `specifickinds` VALUES (5, '武侠小说', '2025-05-29 10:27:26', 1);

INSERT INTO `specifickinds` VALUES (6, '古典诗词', '2025-05-29 10:27:26', 2);
INSERT INTO `specifickinds` VALUES (7, '现代诗歌', '2025-05-29 10:27:26', 2);
INSERT INTO `specifickinds` VALUES (8, '外国诗歌', '2025-05-29 10:27:26', 2);

INSERT INTO `specifickinds` VALUES (9, '话剧剧本', '2025-05-29 10:27:26', 3);
INSERT INTO `specifickinds` VALUES (10, '戏曲剧本', '2025-05-29 10:27:26', 3);
INSERT INTO `specifickinds` VALUES (11, '影视剧本', '2025-05-29 10:27:26', 3);

-- 科学与技术类的小分类
INSERT INTO `specifickinds` VALUES (18, '物理学', '2025-05-29 10:27:26', 6);
INSERT INTO `specifickinds` VALUES (19, '化学', '2025-05-29 10:27:26', 6);
INSERT INTO `specifickinds` VALUES (20, '生物学', '2025-05-29 10:27:26', 6);
INSERT INTO `specifickinds` VALUES (21, '天文学', '2025-05-29 10:27:26', 6);

INSERT INTO `specifickinds` VALUES (22, '机械工程', '2025-05-29 10:27:26', 7);
INSERT INTO `specifickinds` VALUES (23, '电子工程', '2025-05-29 10:27:26', 7);
INSERT INTO `specifickinds` VALUES (24, '建筑工程', '2025-05-29 10:27:26', 7);

INSERT INTO `specifickinds` VALUES (25, '编程语言', '2025-05-29 10:27:26', 8);
INSERT INTO `specifickinds` VALUES (26, '人工智能', '2025-05-29 10:27:26', 8);
INSERT INTO `specifickinds` VALUES (27, '网络安全', '2025-05-29 10:27:26', 8);

-- 经济与管理类的小分类
INSERT INTO `specifickinds` VALUES (48, '宏观经济学', '2025-05-29 10:27:26', 16);
INSERT INTO `specifickinds` VALUES (49, '微观经济学', '2025-05-29 10:27:26', 16);
INSERT INTO `specifickinds` VALUES (50, '经济史', '2025-05-29 10:27:26', 16);

INSERT INTO `specifickinds` VALUES (51, '股票投资', '2025-05-29 10:27:26', 17);
INSERT INTO `specifickinds` VALUES (52, '基金理财', '2025-05-29 10:27:26', 17);
INSERT INTO `specifickinds` VALUES (53, '风险管理', '2025-05-29 10:27:26', 17);

INSERT INTO `specifickinds` VALUES (54, '战略管理', '2025-05-29 10:27:26', 18);
INSERT INTO `specifickinds` VALUES (55, '人力资源管理', '2025-05-29 10:27:26', 18);
INSERT INTO `specifickinds` VALUES (56, '市场营销', '2025-05-29 10:27:26', 18);

-- 生活与休闲类的小分类
INSERT INTO `specifickinds` VALUES (63, '中餐烹饪', '2025-05-29 10:27:26', 21);
INSERT INTO `specifickinds` VALUES (64, '西餐烘焙', '2025-05-29 10:27:26', 21);
INSERT INTO `specifickinds` VALUES (65, '饮食文化', '2025-05-29 10:27:26', 21);

INSERT INTO `specifickinds` VALUES (66, '国内旅行', '2025-05-29 10:27:26', 22);
INSERT INTO `specifickinds` VALUES (67, '境外旅行', '2025-05-29 10:27:26', 22);
INSERT INTO `specifickinds` VALUES (68, '探险旅行', '2025-05-29 10:27:26', 22);

-- 教育与学习类的小分类
INSERT INTO `specifickinds` VALUES (78, '英语学习', '2025-05-29 10:27:26', 26);
INSERT INTO `specifickinds` VALUES (79, '小语种学习', '2025-05-29 10:27:26', 26);
INSERT INTO `specifickinds` VALUES (80, '汉语学习', '2025-05-29 10:27:26', 26);

INSERT INTO `specifickinds` VALUES (81, '升学考试', '2025-05-29 10:27:26', 27);
INSERT INTO `specifickinds` VALUES (82, '职业资格考试', '2025-05-29 10:27:26', 27);
INSERT INTO `specifickinds` VALUES (83, '语言考试', '2025-05-29 10:27:26', 27);

INSERT INTO `specifickinds` VALUES (84, '中小学教材', '2025-05-29 10:27:26', 28);
INSERT INTO `specifickinds` VALUES (85, '大学教材', '2025-05-29 10:27:26', 28);
INSERT INTO `specifickinds` VALUES (86, '参考书', '2025-05-29 10:27:26', 28); 