package com.angelj.jcloudprovider.oauth.mapper;

import com.angelj.jcloudprovider.oauth.model.domain.OauthAccessToken;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OauthAccessTokenMapper extends BaseMapper<OauthAccessToken> {
}
