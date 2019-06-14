package com.angelj.jcloudprovider.admin.api.service;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleDto;
import com.angelj.jcloudprovider.admin.api.service.hystrix.RoleFeignApiHystrix;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@FeignClient(value = "jcloud-provider-admin", fallback = RoleFeignApiHystrix.class)
public interface RoleFeignApi {

    @RequestMapping(value = "api/role/check", method = RequestMethod.POST)
    DataWrapper check(@RequestBody RoleDto roleDto);

    @RequestMapping(value = "api/role/add", method = RequestMethod.POST)
    DataWrapper add(@RequestBody RoleDto roleDto);

    @RequestMapping(value = "api/role/update", method = RequestMethod.POST)
    DataWrapper update(@RequestBody RoleDto roleDto);

    @RequestMapping(value = "api/role/delete", method = RequestMethod.POST)
    DataWrapper delete(@RequestParam("idList") List<String> idList);

    @RequestMapping(value = "api/role/get/{id}", method = RequestMethod.POST)
    DataWrapper get(@PathVariable("id") String id);

    @RequestMapping(value = "api/role/page", method = RequestMethod.POST)
    DataWrapper page(@RequestBody PageDataWrapper<RoleDto> pageDataWrapper) throws IllegalAccessException, IOException, InstantiationException;

    @RequestMapping(value = "api/role/find", method = RequestMethod.POST)
    DataWrapper find(@RequestBody RoleDto roleDto);
}
