package com.angelj.jcloudprovider.admin.api.service;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleGroupDto;
import com.angelj.jcloudprovider.admin.api.service.hystrix.RoleGroupFeignApiHystrix;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(value = "jcloud-provider-admin", fallback = RoleGroupFeignApiHystrix.class)
public interface RoleGroupFeignApi {

    @RequestMapping(value = "api/rolegroup/check", method = RequestMethod.POST)
    DataWrapper check(@RequestBody RoleGroupDto roleGroupDto);

    @RequestMapping(value = "api/rolegroup/add", method = RequestMethod.POST)
    DataWrapper add(@RequestBody RoleGroupDto roleGroupDto);

    @RequestMapping(value = "api/rolegroup/update", method = RequestMethod.POST)
    DataWrapper update(@RequestBody RoleGroupDto roleGroupDto);

    @RequestMapping(value = "api/rolegroup/delete", method = RequestMethod.POST)
    DataWrapper delete(@RequestParam("idList") List<String> idList);

    @RequestMapping(value = "api/rolegroup/get/{id}", method = RequestMethod.POST)
    DataWrapper get(@PathVariable("id") String id);

    @RequestMapping(value = "api/rolegroup/page", method = RequestMethod.POST)
    DataWrapper page(@RequestBody PageDataWrapper<RoleGroupDto> pageDataWrapper);

    @RequestMapping(value = "api/rolegroup/find", method = RequestMethod.POST)
    DataWrapper find(@RequestBody RoleGroupDto roleGroupDto);

}
