package com.angelj.jcloudprovider.oauth.api.service.hystrix;

import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudprovider.oauth.api.model.dto.OauthClientDetailsDto;
import com.angelj.jcloudprovider.oauth.api.model.vo.OauthClientDetailsVo;
import com.angelj.jcloudprovider.oauth.api.service.OauthClientDetailsFeignApi;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OauthClientDetailsFeignHystrix implements OauthClientDetailsFeignApi {
    @Override
    public DataWrapper add(OauthClientDetailsDto oauthClientDetailsDto) {
        return null;
    }

    @Override
    public DataWrapper update(OauthClientDetailsDto oauthClientDetailsDto) {
        return null;
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        return null;
    }

    @Override
    public DataWrapper get(String id) {
        return null;
    }

    @Override
    public DataWrapper page(PageDataWrapper<OauthClientDetailsVo> pageDataWrapper) {
        return null;
    }
}
