package com.angelj.jcloudauth.mapper;

import com.angelj.jcloudauth.model.Role;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper extends BaseMapper<RoleMapper> {
    List<Role> findRoleListByUserId(@Param("userId") Integer userId);
}
