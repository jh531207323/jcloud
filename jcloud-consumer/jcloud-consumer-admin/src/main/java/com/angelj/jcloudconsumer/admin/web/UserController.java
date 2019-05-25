package com.angelj.jcloudconsumer.admin.web;

import com.angelj.jcloudprovider.admin.api.service.UserFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    UserFeignApi userFeignApi;

    @RequestMapping("login")
    public String login(@RequestParam String fAccountname, @RequestParam String fPassword)
    {
        return userFeignApi.login(fAccountname,fPassword);
    }
}
