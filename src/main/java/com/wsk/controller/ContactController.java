package com.wsk.controller;

import com.wsk.bean.ContactMessage;
import com.wsk.pojo.UserInformation;
import com.wsk.service.ContactMessageService;
import com.wsk.token.TokenProccessor;
import com.wsk.tool.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;

/**
 * 联系我们控制器
 */
@Controller
public class ContactController {
    
    private final ContactMessageService contactMessageService;
    
    @Autowired
    public ContactController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    /**
     * 显示联系我们页面
     */
    @RequestMapping(value = "/contact.do", method = RequestMethod.GET)
    public String showContactPage(HttpServletRequest request, Model model) {
        // 获取用户信息（如果已登录）
        UserInformation userInformation = (UserInformation) request.getSession().getAttribute("userInformation");
        if (StringUtils.getInstance().isNullOrEmpty(userInformation)) {
            userInformation = new UserInformation();
        }
        model.addAttribute("userInformation", userInformation);
        
        // 生成表单token防止重复提交
        String token = TokenProccessor.getInstance().makeToken();
        request.getSession().setAttribute("token", token);
        model.addAttribute("token", token);
        return "page/contact_us";
    }

    /**
     * 处理联系表单提交
     */
    @RequestMapping(value = "/submitContact.do", method = RequestMethod.POST)
    public String handleContactForm(HttpServletRequest request,
                                   @RequestParam("fullName") String fullName,
                                   @RequestParam("email") String email,
                                   @RequestParam("message") String message,
                                   @RequestParam("token") String token,
                                   RedirectAttributes redirectAttributes) {

        // 表单验证
        if (StringUtils.getInstance().isNullOrEmpty(fullName) || 
            StringUtils.getInstance().isNullOrEmpty(email) || 
            StringUtils.getInstance().isNullOrEmpty(message)) {
            redirectAttributes.addFlashAttribute("error", "请填写完整信息");
            return "redirect:/contact.do";
        }
        
        // 检查token，防止重复提交
        String sessionToken = (String) request.getSession().getAttribute("token");
        if (sessionToken == null || !sessionToken.equals(token)) {
            redirectAttributes.addFlashAttribute("error", "表单已提交或会话已过期，请刷新页面重试");
            return "redirect:/contact.do";
        }
        
        // 移除session中的token
        request.getSession().removeAttribute("token");
        
        // 保存联系信息到数据库
        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setFullName(fullName);
        contactMessage.setEmail(email);
        contactMessage.setMessage(message);
        contactMessage.setStatus(0); // 未处理
        contactMessage.setCreateTime(new Timestamp(System.currentTimeMillis()));
        
        boolean success = contactMessageService.saveContactMessage(contactMessage);
        
        if (success) {
            redirectAttributes.addFlashAttribute("success", "感谢您的留言，我们会尽快回复您！");
        } else {
            redirectAttributes.addFlashAttribute("error", "提交失败，请稍后再试");
        }
        
        return "redirect:/contact.do";
    }
} 