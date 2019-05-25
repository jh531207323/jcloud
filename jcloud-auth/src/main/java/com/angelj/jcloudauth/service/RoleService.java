package com.angelj.jcloudauth.service;

import com.angelj.jcloudauth.model.Role;

import java.util.List;

public interface RoleService {

    List<Role> findRoleListByUserId(Integer userId);
}
