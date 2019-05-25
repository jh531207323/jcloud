package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.UserMapper;
import com.angelj.jcloudprovider.admin.model.User;
import com.angelj.jcloudprovider.admin.service.UserService;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User Login(User user) {

        Wrapper<User> wrapper = new QueryWrapper<User>()
                .lambda()
                .eq(User::getFAccountname,user.getFAccountname())
                .eq(User::getFPassword,user.getFPassword());


        return userMapper.selectOne(wrapper);
    }
}
