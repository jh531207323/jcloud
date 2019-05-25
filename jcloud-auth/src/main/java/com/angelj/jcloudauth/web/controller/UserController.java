package com.angelj.jcloudauth.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping("current")
    public Principal current(Principal user)
    {
        return user;
    }
}
