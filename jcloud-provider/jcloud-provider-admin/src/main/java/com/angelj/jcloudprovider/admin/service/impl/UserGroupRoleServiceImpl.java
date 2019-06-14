package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.UserGroupRoleMapper;
import com.angelj.jcloudprovider.admin.model.domain.UserGroupRole;
import com.angelj.jcloudprovider.admin.service.UserGroupRoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class UserGroupRoleServiceImpl extends ServiceImpl<UserGroupRoleMapper, UserGroupRole> implements UserGroupRoleService {
}
