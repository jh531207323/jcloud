package com.angelj.jcloudprovider.oauth.service.impl;

import com.angelj.jcloudprovider.oauth.mapper.OauthCodeMapper;
import com.angelj.jcloudprovider.oauth.model.domain.OauthCode;
import com.angelj.jcloudprovider.oauth.service.OauthCodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class OauthCodeServiceImpl extends ServiceImpl<OauthCodeMapper, OauthCode> implements OauthCodeService {
}
