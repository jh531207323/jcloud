package com.angelj.jcloudauth.service.impl;

import com.angelj.jcloudauth.mapper.RoleMapper;
import com.angelj.jcloudauth.model.Role;
import com.angelj.jcloudauth.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleMapper roleMapper;

    @Override
    public List<Role> findRoleListByUserId(Integer userId) {

        return roleMapper.findRoleListByUserId(userId);
    }
}
