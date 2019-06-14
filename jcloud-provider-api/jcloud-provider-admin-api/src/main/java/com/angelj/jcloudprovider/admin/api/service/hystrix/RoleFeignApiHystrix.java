package com.angelj.jcloudprovider.admin.api.service.hystrix;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleDto;
import com.angelj.jcloudprovider.admin.api.service.RoleFeignApi;

import java.util.List;

public class RoleFeignApiHystrix implements RoleFeignApi {
    @Override
    public DataWrapper check(RoleDto roleDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper add(RoleDto roleDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper update(RoleDto roleDto) {
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
    public DataWrapper page(PageDataWrapper<RoleDto> pageDataWrapper) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper find(RoleDto roleDto) {
        return HandleResultMapper.wrapFailed();
    }
}
