package com.angelj.jcloudauth.service.impl;

import com.angelj.jcloudauth.mapper.UserMapper;
import com.angelj.jcloudauth.model.User;
import com.angelj.jcloudauth.service.UserService;
import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public User findUserByUserName(String userName) {

        Wrapper<User> wrapper = new QueryWrapper<User>()
                .lambda()
                .eq(User::getFUsername,userName);

        return userMapper.selectOne(wrapper);
    }
}
