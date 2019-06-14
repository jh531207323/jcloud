package com.angelj.jcloudprovider.admin.api.service.hystrix;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleGroupDto;
import com.angelj.jcloudprovider.admin.api.model.vo.RoleGroupVo;
import com.angelj.jcloudprovider.admin.api.service.RoleGroupFeignApi;

import java.util.List;

public class RoleGroupFeignApiHystrix implements RoleGroupFeignApi {
    @Override
    public DataWrapper check(RoleGroupDto roleGroupDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper add(RoleGroupDto roleGroupDto) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper update(RoleGroupDto roleGroupDto) {
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
    public DataWrapper page(PageDataWrapper<RoleGroupDto> pageDataWrapper) {
        return HandleResultMapper.wrapFailed();
    }

    @Override
    public DataWrapper find(RoleGroupDto roleGroupDto)
    {
        return HandleResultMapper.wrapFailed();
    }
}
