package com.angelj.jcloudprovider.admin.service.impl;

import com.angelj.jcloudprovider.admin.mapper.PageElementMapper;
import com.angelj.jcloudprovider.admin.model.domain.PageElement;
import com.angelj.jcloudprovider.admin.service.PageElementService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class PageElementServiceImpl extends ServiceImpl<PageElementMapper, PageElement> implements PageElementService {
}
