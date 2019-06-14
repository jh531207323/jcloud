package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.ResourceMenuMapper;
import com.angelj.jcloudprovider.admin.model.domain.ResourceMenu;
import com.angelj.jcloudprovider.admin.service.ResourceMenuService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class ResourceMenuServiceImpl extends ServiceImpl<ResourceMenuMapper, ResourceMenu> implements ResourceMenuService {
}
