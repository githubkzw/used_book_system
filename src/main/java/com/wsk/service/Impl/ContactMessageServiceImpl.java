package com.wsk.service.Impl;

import com.wsk.bean.ContactMessage;
import com.wsk.dao.ContactMessageMapper;
import com.wsk.service.ContactMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class ContactMessageServiceImpl implements ContactMessageService {

    private final ContactMessageMapper contactMessageMapper;

    @Autowired
    public ContactMessageServiceImpl(ContactMessageMapper contactMessageMapper) {
        this.contactMessageMapper = contactMessageMapper;
    }

    @Override
    public boolean saveContactMessage(ContactMessage contactMessage) {
        // 设置默认值
        if (contactMessage.getStatus() == null) {
            contactMessage.setStatus(0); // 0-未处理
        }
        if (contactMessage.getCreateTime() == null) {
            contactMessage.setCreateTime(new Timestamp(System.currentTimeMillis()));
        }
        
        return contactMessageMapper.insertContactMessage(contactMessage) > 0;
    }

    @Override
    public boolean updateMessageStatus(Integer id, Integer status) {
        return contactMessageMapper.updateContactMessageStatus(id, status) > 0;
    }
} 