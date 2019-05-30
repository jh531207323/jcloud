package com.angelj.jcloudprovider.oauth.service.impl;

import com.angelj.jcloudprovider.oauth.mapper.OauthApprovalsMapper;
import com.angelj.jcloudprovider.oauth.model.domain.OauthApprovals;
import com.angelj.jcloudprovider.oauth.service.OauthApprovalsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class OauthApprovalsServiceImpl extends ServiceImpl<OauthApprovalsMapper, OauthApprovals> implements OauthApprovalsService {
}
