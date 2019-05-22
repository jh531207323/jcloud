package com.angelj.jcloudprovider.admin.api.service;

import com.angelj.jcloudprovider.admin.api.service.hystrix.UserFeignApiHystrix;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value = "jcloud-provider-admin", fallback = UserFeignApiHystrix.class)
public interface UserFeignApi {

    @RequestMapping(value = "/user/login", method = RequestMethod.GET)
    String login(@RequestParam("fAccountname") String fAccountname, @RequestParam("fPassword") String fPassword);
}
