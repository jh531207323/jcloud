package com.angelj.jcloudprovider.admin.web.rpc;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleDto;
import com.angelj.jcloudprovider.admin.api.service.RoleFeignApi;
import com.angelj.jcloudprovider.admin.model.domain.Role;
import com.angelj.jcloudprovider.admin.service.RoleService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class RoleFeignClient implements RoleFeignApi {

    @Autowired
    RoleService roleService;

    @Override
    public DataWrapper check(RoleDto roleDto) {

        QueryWrapper<Role> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(roleDto.getRoleCode())) {
            queryWrapper.lambda().eq(Role::getRoleCode, roleDto.getRoleCode());
        }

        int count = roleService.count(queryWrapper);
        if (count > 0) {
            return HandleResultMapper.wrapFailed("该对象已存在");
        } else {
            return HandleResultMapper.wrapSuccess();
        }
    }

    @Override
    public DataWrapper add(RoleDto roleDto) {

        Role role = BeanConverter.copyProperties(roleDto, Role.class);

        role.setId((int) IdWorker.getId());
        role.setIsValid("Y");
        role.setCreateTime(new Date());

        boolean flag = roleService.save(role);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper update(RoleDto roleDto) {

        Role role = BeanConverter.copyProperties(roleDto, Role.class);

        boolean flag = roleService.updateById(role);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        boolean flag = roleService.removeByIds(idList);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper get(String id) {
        Role role = roleService.getById(id);

        if (role != null) {
            RoleDto roleDto = BeanConverter.copyProperties(role, RoleDto.class);

            return HandleResultMapper.wrapResult(roleDto);
        } else {
            return HandleResultMapper.wrapResult(null);
        }
    }

    @Override
    public DataWrapper page(PageDataWrapper<RoleDto> pageDataWrapper) {
        Page<Role> page = new Page<>();
        page.setSize(pageDataWrapper.getPageSize());
        page.setCurrent(pageDataWrapper.getPageIndex());

        QueryWrapper<Role> queryWrapper = null;
        if (pageDataWrapper.getQueryObject() != null) {
            queryWrapper = new QueryWrapper<>();
            if (StringUtils.isNotEmpty(pageDataWrapper.getQueryObject().getRoleName())) {
                queryWrapper.lambda().like(Role::getRoleName, pageDataWrapper.getQueryObject().getRoleName());
            }
        }

        IPage<Role> pageResult = roleService.page(page, queryWrapper);

        List<RoleDto> roleDtoList = BeanConverter.copyList(pageResult.getRecords(), RoleDto.class);

        pageDataWrapper.setDataCount(pageResult.getTotal());
        pageDataWrapper.setData(roleDtoList);

        return HandleResultMapper.wrapPage(pageDataWrapper);
    }

    @Override
    public DataWrapper find(RoleDto roleDto) {

        QueryWrapper<Role> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(roleDto.getRoleName())) {
            queryWrapper.lambda().eq(Role::getRoleName, roleDto.getRoleName());
        }

        List<Role> roleList = roleService.list(queryWrapper);

        List<RoleDto> roleDtoList = BeanConverter.copyList(roleList, RoleDto.class);

        return HandleResultMapper.wrapResult(roleDtoList);
    }
}
