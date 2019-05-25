package com.angelj.jcloudprovider.admin.web.controller;

import com.angelj.jcloudprovider.admin.model.User;
import com.angelj.jcloudprovider.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("login")
    public User login(User user) {
        return userService.Login(user);
    }

    @RequestMapping("login")
    public String login(@RequestParam String fAccountname, @RequestParam String fPassword)
    {
        User user = new User();
        user.setFAccountname(fAccountname);
        user.setFPassword(fPassword);

        return userService.Login(user).getFUsername();
    }
}
