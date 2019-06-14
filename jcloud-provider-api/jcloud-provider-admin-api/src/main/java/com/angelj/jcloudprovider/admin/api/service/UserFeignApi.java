package com.angelj.jcloudprovider.admin.api.service;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.UserDto;
import com.angelj.jcloudprovider.admin.api.service.hystrix.UserFeignApiHystrix;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "jcloud-provider-admin", fallback = UserFeignApiHystrix.class)
public interface UserFeignApi {

    @RequestMapping(value = "api/user/check", method = RequestMethod.POST)
    DataWrapper check(@RequestBody UserDto userDto);

    @RequestMapping(value = "api/user/add", method = RequestMethod.POST)
    DataWrapper add(@RequestBody UserDto userDto);

    @RequestMapping(value = "api/user/update", method = RequestMethod.POST)
    DataWrapper update(@RequestBody UserDto userDto);

    @RequestMapping(value = "api/user/delete", method = RequestMethod.POST)
    DataWrapper delete(@RequestParam("idList") List<String> idList);

    @RequestMapping(value = "api/user/get/{id}", method = RequestMethod.POST)
    DataWrapper get(@PathVariable("id") String id);

    @RequestMapping(value = "api/user/page", method = RequestMethod.POST)
    DataWrapper page(@RequestBody PageDataWrapper<UserDto> pageDataWrapper);

    @RequestMapping(value = "api/user/find", method = RequestMethod.POST)
    DataWrapper find(@RequestBody UserDto userDto);

    @RequestMapping(value = "api/user/login", method = RequestMethod.POST)
    DataWrapper login(@RequestParam("userName") String userName, @RequestParam("password") String password);
}
