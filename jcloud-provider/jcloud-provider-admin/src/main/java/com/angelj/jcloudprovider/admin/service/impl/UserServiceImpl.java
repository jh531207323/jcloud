package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.UserMapper;
import com.angelj.jcloudprovider.admin.service.UserService;
import com.angelj.jcloudprovider.admin.model.domain.User;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
