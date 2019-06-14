package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.OperationMapper;
import com.angelj.jcloudprovider.admin.model.domain.Operation;
import com.angelj.jcloudprovider.admin.service.OperationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class OperationServiceImpl extends ServiceImpl<OperationMapper, Operation> implements OperationService {
}
