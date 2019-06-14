package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.ResourceTypeMapper;
import com.angelj.jcloudprovider.admin.model.domain.ResourceType;
import com.angelj.jcloudprovider.admin.service.ResourceTypeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class ResourceTypeServiceImpl extends ServiceImpl<ResourceTypeMapper, ResourceType> implements ResourceTypeService {
}
