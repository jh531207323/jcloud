package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.UserGroupUserMapper;
import com.angelj.jcloudprovider.admin.model.domain.UserGroupUser;
import com.angelj.jcloudprovider.admin.service.UserGroupUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class UserGroupUserServiceImpl extends ServiceImpl<UserGroupUserMapper, UserGroupUser> implements UserGroupUserService {
}
