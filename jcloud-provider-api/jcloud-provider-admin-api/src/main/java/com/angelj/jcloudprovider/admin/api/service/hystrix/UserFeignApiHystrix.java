package com.angelj.jcloudprovider.admin.api.service.hystrix;

import com.angelj.jcloudprovider.admin.api.service.UserFeignApi;

public class UserFeignApiHystrix implements UserFeignApi {
    @Override
    public String login(String fAccountname, String fPassword) {
        return "User Feign Api Error";
    }
}
