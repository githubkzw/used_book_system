package com.wsk.controller;

import com.wsk.bean.ShopInformationBean;
import com.wsk.pojo.*;
import com.wsk.service.*;
import com.wsk.tool.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wsk1103 on 2025/4/11.
 */
@Controller
public class HomeController {
    @Resource
    private ShopInformationService shopInformationService;
    @Resource
    private SpecificeService specificeService;
    @Resource
    private ClassificationService classificationService;
    @Resource
    private AllKindsService allKindsService;
    @Resource
    private ShopContextService shopContextService;


    @RequestMapping(value = {"/", "/home.do"})
    public String home(HttpServletRequest request, Model model) {
        UserInformation userInformation = (UserInformation) request.getSession().getAttribute("userInformation");
        // if user login,the session will have the "userInformation"
        if (!StringUtils.getInstance().isNullOrEmpty(userInformation)) {
            model.addAttribute("userInformation", userInformation);
        } else {
            userInformation = new UserInformation();
            model.addAttribute("userInformation", userInformation);
        }
        //一般形式进入首页
        try {
            List<ShopInformation> shopInformations = selectTen(1, 5);
            List<ShopInformationBean> list = new ArrayList<>();
            int counts = getShopCounts();
            model.addAttribute("shopInformationCounts", counts);
            
            for (ShopInformation shopInformation : shopInformations) {
                ShopInformationBean shopInformationBean = new ShopInformationBean();
                
                // 安全地获取分类名称
                Integer sort = shopInformation.getSort();
                String sortName;
                if (sort == null) {
                    sortName = "未分类";
                    System.out.println("Warning: Shop ID " + shopInformation.getId() + " has null sort value");
                } else {
                    sortName = getSortName(sort);
                    if (sortName.equals("未知分类")) {
                        System.out.println("Warning: Shop ID " + shopInformation.getId() + " has invalid sort value: " + sort);
                    }
                }
                
                shopInformationBean.setId(shopInformation.getId());
                shopInformationBean.setName(shopInformation.getName());
                shopInformationBean.setLevel(shopInformation.getLevel());
                shopInformationBean.setPrice(shopInformation.getPrice().doubleValue());
                shopInformationBean.setRemark(shopInformation.getRemark());
                shopInformationBean.setSort(sortName);
                shopInformationBean.setQuantity(shopInformation.getQuantity());
                shopInformationBean.setUid(shopInformation.getUid());
                shopInformationBean.setTransaction(shopInformation.getTransaction());
                shopInformationBean.setImage(shopInformation.getImage());
                list.add(shopInformationBean);
            }
            model.addAttribute("shopInformationBean", list);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error in home method: " + e.getMessage());
            return "page/login_page";
        }
        return "index";
    }

    //进入商城
    @RequestMapping(value = "/mall_page.do")
    public String mallPage(HttpServletRequest request, Model model) {
        UserInformation userInformation = (UserInformation) request.getSession().getAttribute("userInformation");
        if (StringUtils.getInstance().isNullOrEmpty(userInformation)) {
            userInformation = new UserInformation();
            model.addAttribute("userInformation", userInformation);
        } else {
            model.addAttribute("userInformation", userInformation);
        }
        try {
            List<ShopInformation> shopInformations = selectTen(1, 12);
            List<ShopInformationBean> list = new ArrayList<>();
            int counts = getShopCounts();
            model.addAttribute("shopInformationCounts", counts);
            String sortName;
            for (ShopInformation shopInformation : shopInformations) {
                int sort = shopInformation.getSort();
                sortName = getSortName(sort);
                ShopInformationBean shopInformationBean = new ShopInformationBean();
                shopInformationBean.setId(shopInformation.getId());
                shopInformationBean.setName(shopInformation.getName());
                shopInformationBean.setLevel(shopInformation.getLevel());
                shopInformationBean.setRemark(shopInformation.getRemark());
                shopInformationBean.setPrice(shopInformation.getPrice().doubleValue());
                shopInformationBean.setSort(sortName);
                shopInformationBean.setQuantity(shopInformation.getQuantity());
                shopInformationBean.setTransaction(shopInformation.getTransaction());
                shopInformationBean.setUid(shopInformation.getUid());
                shopInformationBean.setImage(shopInformation.getImage());
                list.add(shopInformationBean);
            }
            model.addAttribute("shopInformationBean", list);
        } catch (Exception e) {
            e.printStackTrace();
            return "page/login_page";
        }
        return "page/mall_page";
    }

    //通过分类的第三层id获取全名
    private String getSortName(int sort) {
        if (sort <= 0) {
            System.out.println("Warning: Invalid sort value: " + sort);
            return "未知分类";
        }

        try {
            // 获取第三层分类
            Specific specific = selectSpecificBySort(sort);
            if (specific == null) {
                System.out.println("Warning: No specific category found for sort: " + sort);
                return "未知分类";
            }

            // 获取第二层分类
            Integer cid = specific.getCid();
            if (cid == null) {
                System.out.println("Warning: Specific category has null cid for sort: " + sort);
                return specific.getName() != null ? specific.getName() : "未知分类";
            }

            Classification classification = selectClassificationByCid(cid);
            if (classification == null) {
                System.out.println("Warning: No classification found for cid: " + cid);
                return specific.getName() != null ? specific.getName() : "未知分类";
            }

            // 获取第一层分类
            Integer aid = classification.getAid();
            if (aid == null) {
                System.out.println("Warning: Classification has null aid for cid: " + cid);
                return classification.getName() != null ? classification.getName() : "未知分类";
            }

            AllKinds allKinds = selectAllKindsByAid(aid);
            if (allKinds == null) {
                System.out.println("Warning: No allKinds found for aid: " + aid);
                return classification.getName() != null ? classification.getName() : "未知分类";
            }

            // 构建完整分类名
            StringBuilder stringBuffer = new StringBuilder();
            
            String allKindsName = allKinds.getName();
            String classificationName = classification.getName();
            String specificName = specific.getName();
            
            if (allKindsName != null) {
                stringBuffer.append(allKindsName);
            }
            
            if (classificationName != null) {
                if (stringBuffer.length() > 0) {
                    stringBuffer.append("-");
                }
                stringBuffer.append(classificationName);
            }
            
            if (specificName != null) {
                if (stringBuffer.length() > 0) {
                    stringBuffer.append("-");
                }
                stringBuffer.append(specificName);
            }
            
            return stringBuffer.length() > 0 ? stringBuffer.toString() : "未知分类";
            
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error in getSortName for sort " + sort + ": " + e.getMessage());
            return "未知分类";
        }
    }

    //获得分类中的第一层
    @RequestMapping(value = "/getAllKinds.do")
    @ResponseBody
    public List<AllKinds> getAllKind() {
        return getAllKinds();
    }

    //获得分类中的第二层，通过第一层的id
    @RequestMapping(value = "/getClassification.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Classification> getClassificationByAid(@RequestParam int id) {
        return selectAllClassification(id);
    }

    //通过第二层的id获取对应的第三层
    @RequestMapping(value = "/getSpecific.do")
    @ResponseBody
    public List<Specific> getSpecificByCid(@RequestParam int id) {
        return selectAllSpecific(id);
    }

    //get the shops counts
    @RequestMapping(value = "/getShopsCounts.do")
    @ResponseBody
    public Map getShopsCounts() {
        Map<String, Integer> map = new HashMap<>();
        int counts = 0;
        try {
            counts = shopInformationService.getCounts();
        } catch (Exception e) {
            e.printStackTrace();
            map.put("counts", counts);
            return map;
        }
        map.put("counts", counts);
        return map;
    }

    @RequestMapping(value = "/getShops.do")
    @ResponseBody
    public List getShops(@RequestParam int start) {
        List<ShopInformation> list = new ArrayList<>();
        try {
            int end = 12;
            list = selectTen(start, end);
        } catch (Exception e) {
            e.printStackTrace();
            return list;
        }
        return list;
    }


    //获取商品，分页,一次性获取end个
    private List<ShopInformation> selectTen(int start, int end) {
        try {
            Map<String, Integer> map = new HashMap<>();
            map.put("start", (start - 1) * end);
            map.put("end", end);
            List<ShopInformation> list = shopInformationService.selectTen(map);
            
            // 打印调试信息
            if (list != null) {
                for (ShopInformation shop : list) {
                    System.out.println("Debug - Shop ID: " + shop.getId() + 
                                     ", Name: " + shop.getName() + 
                                     ", Sort: " + shop.getSort());
                }
            }
            
            return list != null ? list : new ArrayList<>();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error in selectTen: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    //获取最详细的分类，第三层
    private Specific selectSpecificBySort(int sort) {
        return specificeService.selectByPrimaryKey(sort);
    }

    //获得第二层分类
    private Classification selectClassificationByCid(int cid) {
        return classificationService.selectByPrimaryKey(cid);
    }

    //获得第一层分类
    private AllKinds selectAllKindsByAid(int aid) {
        return allKindsService.selectByPrimaryKey(aid);
    }

    //获得第一层所有
    private List<AllKinds> getAllKinds() {
        return allKindsService.selectAll();
    }

    //根据第一层的id获取该层下的第二层
    private List<Classification> selectAllClassification(int aid) {
        return classificationService.selectByAid(aid);
    }

    //根据第二层的id获取其对应的第三层所有id
    private List<Specific> selectAllSpecific(int cid) {
        return specificeService.selectByCid(cid);
    }

    //获取完整的分类信息
    @RequestMapping(value = "/getFullCategoryInfo.do", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Integer> getFullCategoryInfo(@RequestParam int sort) {
        Map<String, Integer> result = new HashMap<>();
        try {
            // 获取三级分类
            Specific specific = selectSpecificBySort(sort);
            if (specific != null) {
                // 获取二级分类
                Classification classification = selectClassificationByCid(specific.getCid());
                if (classification != null) {
                    // 获取一级分类
                    AllKinds allKinds = selectAllKindsByAid(classification.getAid());
                    if (allKinds != null) {
                        result.put("aid", allKinds.getId());
                        result.put("cid", classification.getId());
                        result.put("sort", specific.getId());
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    //获得商品总页数
    private int getShopCounts() {
        return shopInformationService.getCounts();
    }

    //获得商品留言总页数
    private int getShopContextCounts(int sid) {
        return shopContextService.getCounts(sid);
    }

    //获得商品留言，10条
    private List<ShopContext> selectShopContextBySid(int sid, int start) {
        return shopContextService.findById(sid, (start - 1) * 10);
    }

    //进入产品介绍页面
    @RequestMapping(value = "/product_intro.do")
    public String productIntro(HttpServletRequest request, Model model) {
        UserInformation userInformation = (UserInformation) request.getSession().getAttribute("userInformation");
        if (StringUtils.getInstance().isNullOrEmpty(userInformation)) {
            userInformation = new UserInformation();
        }
        model.addAttribute("userInformation", userInformation);
        return "page/product_intro";
    }
}
