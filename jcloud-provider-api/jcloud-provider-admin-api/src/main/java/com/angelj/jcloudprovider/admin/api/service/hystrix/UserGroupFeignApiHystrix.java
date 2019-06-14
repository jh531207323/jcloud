package com.angelj.jcloudprovider.admin.api.service.hystrix;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.UserGroupDto;
import com.angelj.jcloudprovider.admin.api.service.UserGroupFeignApi;

import java.util.List;

public class UserGroupFeignApiHystrix implements UserGroupFeignApi {
    @Override
    public DataWrapper check(UserGroupDto userGroupDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper add(UserGroupDto userGroupDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper update(UserGroupDto userGroupDto) {
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
    public DataWrapper page(PageDataWrapper<UserGroupDto> pageDataWrapper) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper find(UserGroupDto userGroupDto) {
        return HandleResultMapper.wrapFailed();
    }
}
