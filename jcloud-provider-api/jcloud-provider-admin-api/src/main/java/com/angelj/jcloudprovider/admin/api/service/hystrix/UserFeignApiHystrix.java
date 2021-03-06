package com.angelj.jcloudprovider.admin.api.service.hystrix;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.UserDto;
import com.angelj.jcloudprovider.admin.api.service.UserFeignApi;

import java.util.List;

public class UserFeignApiHystrix implements UserFeignApi {


    @Override
    public DataWrapper check(UserDto userDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper add(UserDto userDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper update(UserDto userDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper get(String id) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper page(PageDataWrapper<UserDto> pageDataWrapper) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper find(UserDto userDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper login(String userName, String password) {
        return HandleResultMapper.wrapFailed();
    }
}
