package com.angelj.jcloudauth.service;

import com.angelj.jcloudauth.model.User;

public interface UserService {
    User findUserByUserName(String userName);
}
