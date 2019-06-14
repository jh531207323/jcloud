package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.RoleGroupMapper;
import com.angelj.jcloudprovider.admin.model.domain.RoleGroup;
import com.angelj.jcloudprovider.admin.service.RoleGroupService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class RoleGroupServiceImpl extends ServiceImpl<RoleGroupMapper, RoleGroup> implements RoleGroupService {
}
