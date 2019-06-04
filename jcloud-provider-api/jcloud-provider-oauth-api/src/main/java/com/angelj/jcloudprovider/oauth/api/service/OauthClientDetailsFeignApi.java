package com.angelj.jcloudprovider.oauth.api.service;

import com.angelj.jcloudcommon.util.config.feign.FeignConfiguration;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudprovider.oauth.api.model.dto.OauthClientDetailsDto;
import com.angelj.jcloudprovider.oauth.api.model.vo.OauthClientDetailsVo;
import com.angelj.jcloudprovider.oauth.api.service.hystrix.OauthClientDetailsFeignHystrix;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "jcloud-provider-oauth", fallback = OauthClientDetailsFeignHystrix.class,configuration = FeignConfiguration.class)
public interface OauthClientDetailsFeignApi {

    @RequestMapping(value = "api/oauthclientdetails/check", method = RequestMethod.POST)
    DataWrapper check(@RequestBody OauthClientDetailsDto oauthClientDetailsDto);

    @RequestMapping(value = "api/oauthclientdetails/add", method = RequestMethod.POST)
    DataWrapper add(@RequestBody OauthClientDetailsDto oauthClientDetailsDto);

    @RequestMapping(value = "api/oauthclientdetails/update", method = RequestMethod.POST)
    DataWrapper update(@RequestBody OauthClientDetailsDto oauthClientDetailsDto);

    @RequestMapping(value = "api/oauthclientdetails/delete", method = RequestMethod.POST)
    DataWrapper delete(@RequestParam("idList") List<String> idList);

    @RequestMapping(value = "api/oauthclientdetails/get/{id}", method = RequestMethod.POST)
    DataWrapper get(@PathVariable("idList") String id);

    @RequestMapping(value = "api/oauthclientdetails/page", method = RequestMethod.POST)
    DataWrapper page(@RequestBody PageDataWrapper<OauthClientDetailsVo> pageDataWrapper);
}
