package com.angelj.jcloudprovider.oauth.service.impl;

import com.angelj.jcloudprovider.oauth.mapper.OauthClientTokenMapper;
import com.angelj.jcloudprovider.oauth.model.domain.OauthClientToken;
import com.angelj.jcloudprovider.oauth.service.OauthClientTokenService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class OauthClientTokenServiceImpl extends ServiceImpl<OauthClientTokenMapper, OauthClientToken> implements OauthClientTokenService {
}
