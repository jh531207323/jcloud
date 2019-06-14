package com.angelj.jcloudprovider.admin.web.rpc;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.UserGroupDto;
import com.angelj.jcloudprovider.admin.api.service.UserGroupFeignApi;
import com.angelj.jcloudprovider.admin.model.domain.UserGroup;
import com.angelj.jcloudprovider.admin.service.UserGroupService;
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
public class UserGroupFeignClient implements UserGroupFeignApi {

    @Autowired
    UserGroupService userGroupService;

    @Override
    public DataWrapper check(UserGroupDto userGroupDto) {

        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(userGroupDto.getUserGroupCode())) {
            queryWrapper.lambda().eq(UserGroup::getUserGroupCode, userGroupDto.getUserGroupCode());
        }

        int count = userGroupService.count(queryWrapper);
        if (count > 0) {
            return HandleResultMapper.wrapFailed("该对象已存在");
        } else {
            return HandleResultMapper.wrapSuccess();
        }
    }

    @Override
    public DataWrapper add(UserGroupDto userGroupDto) {

        UserGroup userGroup = BeanConverter.copyProperties(userGroupDto, UserGroup.class);

        userGroup.setId((int) IdWorker.getId());
        userGroup.setIsValid("Y");
        userGroup.setCreateTime(new Date());

        boolean flag = userGroupService.save(userGroup);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper update(UserGroupDto userGroupDto) {

        UserGroup userGroup = BeanConverter.copyProperties(userGroupDto, UserGroup.class);

        boolean flag = userGroupService.updateById(userGroup);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        boolean flag = userGroupService.removeByIds(idList);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper get(String id) {
        UserGroup userGroup = userGroupService.getById(id);

        if (userGroup != null) {
            UserGroupDto userGroupDto = BeanConverter.copyProperties(userGroup, UserGroupDto.class);

            return HandleResultMapper.wrapResult(userGroupDto);
        } else {
            return HandleResultMapper.wrapResult(null);
        }
    }

    @Override
    public DataWrapper page(PageDataWrapper<UserGroupDto> pageDataWrapper) {
        Page<UserGroup> page = new Page<>();
        page.setSize(pageDataWrapper.getPageSize());
        page.setCurrent(pageDataWrapper.getPageIndex());

        QueryWrapper<UserGroup> queryWrapper = null;
        if (pageDataWrapper.getQueryObject() != null) {
            queryWrapper = new QueryWrapper<>();
            if (StringUtils.isNotEmpty(pageDataWrapper.getQueryObject().getUserGroupName())) {
                queryWrapper.lambda().like(UserGroup::getUserGroupName, pageDataWrapper.getQueryObject().getUserGroupName());
            }
        }

        IPage<UserGroup> pageResult = userGroupService.page(page, queryWrapper);

        List<UserGroupDto> userGroupDtoList = BeanConverter.copyList(pageResult.getRecords(), UserGroupDto.class);

        pageDataWrapper.setDataCount(pageResult.getTotal());
        pageDataWrapper.setData(userGroupDtoList);

        return HandleResultMapper.wrapPage(pageDataWrapper);
    }

    @Override
    public DataWrapper find(UserGroupDto userGroupDto) {

        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(userGroupDto.getUserGroupCode())) {
            queryWrapper.lambda().eq(UserGroup::getUserGroupCode, userGroupDto.getUserGroupCode());
        }

        List<UserGroup> userGroupList = userGroupService.list(queryWrapper);

        List<UserGroupDto> userGroupDtoList = BeanConverter.copyList(userGroupList, UserGroupDto.class);

        return HandleResultMapper.wrapResult(userGroupDtoList);
    }
}
