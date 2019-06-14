package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.RoleMapper;
import com.angelj.jcloudprovider.admin.model.domain.Role;
import com.angelj.jcloudprovider.admin.service.RoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {
}
