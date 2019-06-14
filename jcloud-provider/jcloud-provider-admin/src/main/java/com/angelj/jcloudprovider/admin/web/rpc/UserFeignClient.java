package com.angelj.jcloudprovider.admin.web.rpc;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.UserDto;
import com.angelj.jcloudprovider.admin.api.service.UserFeignApi;
import com.angelj.jcloudprovider.admin.model.domain.User;
import com.angelj.jcloudprovider.admin.service.UserService;
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
public class UserFeignClient implements UserFeignApi {

    @Autowired
    UserService userService;

    @Override
    public DataWrapper check(UserDto userDto) {

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(userDto.getUserName())) {
            queryWrapper.lambda().eq(User::getUserName, userDto.getUserName());
        }

        int count = userService.count(queryWrapper);
        if (count > 0) {
            return HandleResultMapper.wrapFailed("该对象已存在");
        } else {
            return HandleResultMapper.wrapSuccess();
        }
    }

    @Override
    public DataWrapper add(UserDto userDto) {

        User user = BeanConverter.copyProperties(userDto, User.class);

        user.setId((int) IdWorker.getId());
        user.setIsValid("Y");
        user.setCreateTime(new Date());

        boolean flag = userService.save(user);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper update(UserDto userDto) {

        User user = BeanConverter.copyProperties(userDto, User.class);

        boolean flag = userService.updateById(user);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        boolean flag = userService.removeByIds(idList);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper get(String id) {
        User user = userService.getById(id);

        if (user != null) {
            UserDto userDto = BeanConverter.copyProperties(user, UserDto.class);

            return HandleResultMapper.wrapResult(userDto);
        } else {
            return HandleResultMapper.wrapResult(null);
        }
    }

    @Override
    public DataWrapper page(PageDataWrapper<UserDto> pageDataWrapper) {
        Page<User> page = new Page<>();
        page.setSize(pageDataWrapper.getPageSize());
        page.setCurrent(pageDataWrapper.getPageIndex());

        QueryWrapper<User> queryWrapper = null;
        if (pageDataWrapper.getQueryObject() != null) {
            queryWrapper = new QueryWrapper<>();
            if (StringUtils.isNotEmpty(pageDataWrapper.getQueryObject().getUserName())) {
                queryWrapper.lambda().like(User::getUserName, pageDataWrapper.getQueryObject().getUserName());
            }
        }

        IPage<User> pageResult = userService.page(page, queryWrapper);

        List<UserDto> userDtoList = BeanConverter.copyList(pageResult.getRecords(), UserDto.class);

        pageDataWrapper.setDataCount(pageResult.getTotal());
        pageDataWrapper.setData(userDtoList);

        return HandleResultMapper.wrapPage(pageDataWrapper);
    }

    @Override
    public DataWrapper find(UserDto userDto) {

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(userDto.getUserName())) {
            queryWrapper.lambda().eq(User::getUserName, userDto.getUserName());
        }

        List<User> userList = userService.list(queryWrapper);

        List<UserDto> userDtoList = BeanConverter.copyList(userList, UserDto.class);

        return HandleResultMapper.wrapResult(userDtoList);
    }

    @Override
    public DataWrapper login(String userName, String password) {

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(userName)) {
            queryWrapper.lambda().eq(User::getUserName, userName);
        } else {
            return HandleResultMapper.wrapFailed("参数不能为空");
        }

        if (StringUtils.isNotEmpty(password)) {
            queryWrapper.lambda().eq(User::getPassword, password);
        } else {
            return HandleResultMapper.wrapFailed("参数不能为空");
        }

        int count = userService.count(queryWrapper);
        if (count > 0) {
            return HandleResultMapper.wrapSuccess();
        } else {
            return HandleResultMapper.wrapFailed("该对象不存在");
        }
    }
}
