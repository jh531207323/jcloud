package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.ResourceOperationMapper;
import com.angelj.jcloudprovider.admin.model.domain.ResourceOperation;
import com.angelj.jcloudprovider.admin.service.ResourceOperationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class ResourceOperationServiceImpl extends ServiceImpl<ResourceOperationMapper, ResourceOperation> implements ResourceOperationService {
}
