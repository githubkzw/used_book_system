package com.wsk.service;

import com.wsk.bean.ContactMessage;

public interface ContactMessageService {
    /**
     * 保存联系消息
     * @param contactMessage 联系消息对象
     * @return 是否成功
     */
    boolean saveContactMessage(ContactMessage contactMessage);
    
    /**
     * 更新消息状态
     * @param id 消息ID
     * @param status 新状态
     * @return 是否成功
     */
    boolean updateMessageStatus(Integer id, Integer status);
} 