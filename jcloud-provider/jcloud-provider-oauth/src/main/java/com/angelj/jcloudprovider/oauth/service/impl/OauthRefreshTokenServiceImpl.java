package com.angelj.jcloudprovider.oauth.service.impl;

import com.angelj.jcloudprovider.oauth.mapper.OauthRefreshTokenMapper;
import com.angelj.jcloudprovider.oauth.model.domain.OauthRefreshToken;
import com.angelj.jcloudprovider.oauth.service.OauthRefreshTokenService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class OauthRefreshTokenServiceImpl extends ServiceImpl<OauthRefreshTokenMapper, OauthRefreshToken> implements OauthRefreshTokenService {
}
