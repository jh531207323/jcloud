package com.angelj.jcloudprovider.admin.api.service;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.UserGroupDto;
import com.angelj.jcloudprovider.admin.api.service.hystrix.UserGroupFeignApiHystrix;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "jcloud-provider-admin", fallback = UserGroupFeignApiHystrix.class)
public interface UserGroupFeignApi {

    @RequestMapping(value = "api/usergroup/check", method = RequestMethod.POST)
    DataWrapper check(@RequestBody UserGroupDto userGroupDto);

    @RequestMapping(value = "api/usergroup/add", method = RequestMethod.POST)
    DataWrapper add(@RequestBody UserGroupDto userGroupDto);

    @RequestMapping(value = "api/usergroup/update", method = RequestMethod.POST)
    DataWrapper update(@RequestBody UserGroupDto userGroupDto);

    @RequestMapping(value = "api/usergroup/delete", method = RequestMethod.POST)
    DataWrapper delete(@RequestParam("idList") List<String> idList);

    @RequestMapping(value = "api/usergroup/get/{id}", method = RequestMethod.POST)
    DataWrapper get(@PathVariable("id") String id);

    @RequestMapping(value = "api/usergroup/page", method = RequestMethod.POST)
    DataWrapper page(@RequestBody PageDataWrapper<UserGroupDto> pageDataWrapper);

    @RequestMapping(value = "api/usergroup/find", method = RequestMethod.POST)
    DataWrapper find(@RequestBody UserGroupDto userGroupDto);
}
