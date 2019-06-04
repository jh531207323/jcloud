package com.angelj.jcloudprovider.oauth.api.service.hystrix;

import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
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
    public DataWrapper check(OauthClientDetailsDto oauthClientDetailsDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper add(OauthClientDetailsDto oauthClientDetailsDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper update(OauthClientDetailsDto oauthClientDetailsDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper get(String id) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper page(PageDataWrapper<OauthClientDetailsVo> pageDataWrapper) {
        return HandleResultMapper.wrapFailed();
    }
}
