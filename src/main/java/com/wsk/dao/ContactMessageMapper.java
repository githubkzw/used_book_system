package com.wsk.dao;

import com.wsk.bean.ContactMessage;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ContactMessageMapper {
    
    /**
     * 插入联系消息
     * @param contactMessage 联系消息对象
     * @return 影响的行数
     */
    int insertContactMessage(ContactMessage contactMessage);
    
    /**
     * 更新联系消息状态
     * @param id 消息ID
     * @param status 新状态
     * @return 影响的行数
     */
    int updateContactMessageStatus(Integer id, Integer status);
} 