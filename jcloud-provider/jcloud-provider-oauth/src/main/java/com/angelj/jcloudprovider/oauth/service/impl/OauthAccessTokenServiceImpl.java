package com.angelj.jcloudprovider.oauth.service.impl;

import com.angelj.jcloudprovider.oauth.mapper.OauthAccessTokenMapper;
import com.angelj.jcloudprovider.oauth.model.domain.OauthAccessToken;
import com.angelj.jcloudprovider.oauth.service.OauthAccessTokenService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class OauthAccessTokenServiceImpl extends ServiceImpl<OauthAccessTokenMapper, OauthAccessToken> implements OauthAccessTokenService {
}
