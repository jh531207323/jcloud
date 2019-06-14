package com.angelj.jcloudprovider.admin.web.rpc;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleGroupDto;
import com.angelj.jcloudprovider.admin.api.service.RoleGroupFeignApi;
import com.angelj.jcloudprovider.admin.model.domain.RoleGroup;
import com.angelj.jcloudprovider.admin.service.RoleGroupService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class RoleGroupFeignClient implements RoleGroupFeignApi {

    @Autowired
    RoleGroupService roleGroupService;

    @Override
    public DataWrapper check(RoleGroupDto roleGroupDto) {

        QueryWrapper<RoleGroup> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(roleGroupDto.getRoleGroupCode())) {
            queryWrapper.lambda().eq(RoleGroup::getRoleGroupCode, roleGroupDto.getRoleGroupCode());
        }

        int count = roleGroupService.count(queryWrapper);
        if (count > 0) {
            return HandleResultMapper.wrapFailed("该对象已存在");
        } else {
            return HandleResultMapper.wrapSuccess();
        }
    }

    @Override
    public DataWrapper add(RoleGroupDto roleGroupDto) {

        RoleGroup roleGroup = BeanConverter.copyProperties(roleGroupDto, RoleGroup.class);

        roleGroup.setId((int) IdWorker.getId());
        roleGroup.setIsValid("Y");
        roleGroup.setCreateTime(new Date());

        boolean flag = roleGroupService.save(roleGroup);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper update(RoleGroupDto roleGroupDto) {

        RoleGroup roleGroup = BeanConverter.copyProperties(roleGroupDto, RoleGroup.class);

        boolean flag = roleGroupService.updateById(roleGroup);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        boolean flag = roleGroupService.removeByIds(idList);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper get(String id) {
        RoleGroup roleGroup = roleGroupService.getById(id);

        if (roleGroup != null) {
            RoleGroupDto roleGroupDto = BeanConverter.copyProperties(roleGroup, RoleGroupDto.class);

            return HandleResultMapper.wrapResult(roleGroupDto);
        } else {
            return HandleResultMapper.wrapResult(null);
        }
    }

    @Override
    public DataWrapper page(PageDataWrapper<RoleGroupDto> pageDataWrapper) {
        Page<RoleGroup> page = new Page<>();
        page.setSize(pageDataWrapper.getPageSize());
        page.setCurrent(pageDataWrapper.getPageIndex());

        QueryWrapper<RoleGroup> queryWrapper = null;
        if (pageDataWrapper.getQueryObject() != null) {
            queryWrapper = new QueryWrapper<>();
            if (StringUtils.isNotEmpty(pageDataWrapper.getQueryObject().getRoleGroupName())) {
                queryWrapper.lambda().like(RoleGroup::getRoleGroupName, pageDataWrapper.getQueryObject().getRoleGroupName());
            }
        }

        IPage<RoleGroup> pageResult = roleGroupService.page(page, queryWrapper);

        List<RoleGroupDto> roleGroupDtoList = BeanConverter.copyList(pageResult.getRecords(), RoleGroupDto.class);

        pageDataWrapper.setDataCount(pageResult.getTotal());
        pageDataWrapper.setData(roleGroupDtoList);

        return HandleResultMapper.wrapPage(pageDataWrapper);
    }

    @Override
    public DataWrapper find(RoleGroupDto roleGroupDto) {

        QueryWrapper<RoleGroup> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(roleGroupDto.getRoleGroupCode())) {
            queryWrapper.lambda().eq(RoleGroup::getRoleGroupCode, roleGroupDto.getRoleGroupCode());
        }

        List<RoleGroup> roleGroupList = roleGroupService.list(queryWrapper);

        List<RoleGroupDto> roleGroupDtoList = BeanConverter.copyList(roleGroupList, RoleGroupDto.class);

        return HandleResultMapper.wrapResult(roleGroupDtoList);
    }
}
