/**
 * Created by alone on 2025/4/15.
 */

// 文学与艺术类
var xiaoshuo = createObject(1, '小说', [
    createObject(1, '言情小说'),
    createObject(2, '科幻小说'),
    createObject(3, '悬疑小说'),
    createObject(4, '历史小说'),
    createObject(5, '武侠小说')
]);

var shige = createObject(2, '诗歌', [
    createObject(6, '古典诗词'),
    createObject(7, '现代诗歌'),
    createObject(8, '外国诗歌')
]);

var xiju = createObject(3, '戏剧', [
    createObject(9, '话剧剧本'),
    createObject(10, '戏曲剧本'),
    createObject(11, '影视剧本')
]);

var sanwen = createObject(4, '散文随笔', [
    createObject(12, '现代散文'),
    createObject(13, '经典散文'),
    createObject(14, '随笔杂文')
]);

var wenxuelilun = createObject(5, '文学理论与批评', [
    createObject(15, '文学理论'),
    createObject(16, '文学批评'),
    createObject(17, '比较文学')
]);

var wenxueContent = [xiaoshuo, shige, xiju, sanwen, wenxuelilun];
var wenxueType = createType('文学与艺术类', wenxueContent);

// 科学与技术类
var ziran = createObject(6, '自然科学', [
    createObject(18, '物理学'),
    createObject(19, '化学'),
    createObject(20, '生物学'),
    createObject(21, '天文学')
]);

var gongcheng = createObject(7, '工程技术', [
    createObject(22, '机械工程'),
    createObject(23, '电子工程'),
    createObject(24, '建筑工程')
]);

var jisuanji = createObject(8, '计算机科学', [
    createObject(25, '编程语言'),
    createObject(26, '人工智能'),
    createObject(27, '网络安全')
]);

var yixue = createObject(9, '医学健康', [
    createObject(28, '临床医学'),
    createObject(29, '中医中药'),
    createObject(30, '健康养生')
]);

var shuxue = createObject(10, '数学', [
    createObject(31, '高等数学'),
    createObject(32, '统计学'),
    createObject(33, '应用数学')
]);

var kejiContent = [ziran, gongcheng, jisuanji, yixue, shuxue];
var kejiType = createType('科学与技术类', kejiContent);

// 人文社科类
var lishi = createObject(11, '历史', [
    createObject(34, '中国历史'),
    createObject(35, '世界历史'),
    createObject(36, '历史研究')
]);

var zhexue = createObject(12, '哲学', [
    createObject(37, '中国哲学'),
    createObject(38, '西方哲学'),
    createObject(39, '哲学研究')
]);

var xinlixue = createObject(13, '心理学', [
    createObject(40, '基础心理学'),
    createObject(41, '应用心理学'),
    createObject(42, '心理咨询')
]);

var shehuixue = createObject(14, '社会学', [
    createObject(43, '社会研究'),
    createObject(44, '社会工作'),
    createObject(45, '人类学')
]);

var zhengzhifalu = createObject(15, '政治法律', [
    createObject(46, '政治学'),
    createObject(47, '法学理论'),
    createObject(48, '国际政治')
]);

var renwenContent = [lishi, zhexue, xinlixue, shehuixue, zhengzhifalu];
var renwenType = createType('人文社科类', renwenContent);

// 经济与管理类
var jingji = createObject(16, '经济学', [
    createObject(48, '宏观经济学'),
    createObject(49, '微观经济学'),
    createObject(50, '经济史')
]);

var jinrong = createObject(17, '金融投资', [
    createObject(51, '股票投资'),
    createObject(52, '基金理财'),
    createObject(53, '风险管理')
]);

var qiye = createObject(18, '企业管理', [
    createObject(54, '战略管理'),
    createObject(55, '人力资源管理'),
    createObject(56, '市场营销')
]);

var kuaiji = createObject(19, '会计审计', [
    createObject(57, '会计实务'),
    createObject(58, '审计实务'),
    createObject(59, '财务管理')
]);

var chuangye = createObject(20, '创业创新', [
    createObject(60, '创业指南'),
    createObject(61, '商业模式'),
    createObject(62, '创新思维')
]);

var jingguanContent = [jingji, jinrong, qiye, kuaiji, chuangye];
var jingguanType = createType('经济与管理类', jingguanContent);

// 生活与休闲类
var meishi = createObject(21, '美食烹饪', [
    createObject(63, '中餐烹饪'),
    createObject(64, '西餐烘焙'),
    createObject(65, '饮食文化')
]);

var lvxing = createObject(22, '旅行指南', [
    createObject(66, '国内旅行'),
    createObject(67, '境外旅行'),
    createObject(68, '探险旅行')
]);

var jiaju = createObject(23, '家居生活', [
    createObject(69, '家居设计'),
    createObject(70, '家居装修'),
    createObject(71, '生活百科')
]);

var yundong = createObject(24, '运动健身', [
    createObject(72, '运动健身'),
    createObject(73, '体育竞技'),
    createObject(74, '户外运动')
]);

var shishang = createObject(25, '时尚美容', [
    createObject(75, '时尚搭配'),
    createObject(76, '美容护肤'),
    createObject(77, '个人形象')
]);

var shenghuoContent = [meishi, lvxing, jiaju, yundong, shishang];
var shenghuoType = createType('生活与休闲类', shenghuoContent);

// 教育与学习类
var yuyan = createObject(26, '语言学习', [
    createObject(78, '英语学习'),
    createObject(79, '小语种学习'),
    createObject(80, '汉语学习')
]);

var kaoshi = createObject(27, '考试辅导', [
    createObject(81, '升学考试'),
    createObject(82, '职业资格考试'),
    createObject(83, '语言考试')
]);

var jiaocai = createObject(28, '教材教辅', [
    createObject(84, '中小学教材'),
    createObject(85, '大学教材'),
    createObject(86, '参考书')
]);

var fangfa = createObject(29, '学习方法', [
    createObject(87, '学习技巧'),
    createObject(88, '记忆方法'),
    createObject(89, '考试技巧')
]);

var ertong = createObject(30, '儿童教育', [
    createObject(90, '早教启蒙'),
    createObject(91, '儿童文学'),
    createObject(92, '素质教育')
]);

var jiaoyuContent = [yuyan, kaoshi, jiaocai, fangfa, ertong];
var jiaoyuType = createType('教育与学习类', jiaoyuContent);

// 分类列表
var type_list = [
    [wenxueType],
    [kejiType],
    [renwenType],
    [jingguanType],
    [shenghuoType],
    [jiaoyuType]
];

function createObject(id, name, subcategories) {
    var temp = new Object();
    temp.id = id;
    temp.name = name;
    if (subcategories) {
        temp.content = subcategories;
    }
    return temp;
}

function createType(name, content) {
    var temp = new Object();
    temp.name = name;
    temp.content = content;
    return temp;
}

function getTypeList() {
    return type_list;
}