package com.angelj.jcloudprovider.oauth.web.rpc;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudprovider.oauth.api.model.dto.OauthClientDetailsDto;
import com.angelj.jcloudprovider.oauth.api.service.OauthClientDetailsFeignApi;
import com.angelj.jcloudprovider.oauth.model.domain.OauthClientDetails;
import com.angelj.jcloudprovider.oauth.service.OauthClientDetailsService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class OauthClientDetailsFeignClient implements OauthClientDetailsFeignApi {

    @Autowired
    OauthClientDetailsService oauthClientDetailsService;

    @Override
    public DataWrapper check(OauthClientDetailsDto oauthClientDetailsDto) {

        QueryWrapper<OauthClientDetails> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(oauthClientDetailsDto.getClient_id())) {
            queryWrapper.lambda().eq(OauthClientDetails::getClient_id, oauthClientDetailsDto.getClient_id());
        }

        int count = oauthClientDetailsService.count(queryWrapper);
        if (count > 0) {
            return HandleResultMapper.wrapFailed("该对象已存在");
        } else {
            return HandleResultMapper.wrapSuccess();
        }
    }

    @Override
    public DataWrapper add(OauthClientDetailsDto oauthClientDetailsDto) {

        OauthClientDetails oauthClientDetails = BeanConverter.copyProperties(oauthClientDetailsDto, OauthClientDetails.class);

        boolean flag = oauthClientDetailsService.save(oauthClientDetails);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper update(OauthClientDetailsDto oauthClientDetailsDto) {

        OauthClientDetails oauthClientDetails = BeanConverter.copyProperties(oauthClientDetailsDto, OauthClientDetails.class);

        boolean flag = oauthClientDetailsService.updateById(oauthClientDetails);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper delete(List<String> idList) {
        boolean flag = oauthClientDetailsService.removeByIds(idList);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper get(String id) {
        OauthClientDetails oauthClientDetails = oauthClientDetailsService.getById(id);

        if (oauthClientDetails != null) {
            OauthClientDetailsDto oauthClientDetailsDto = BeanConverter.copyProperties(oauthClientDetails, OauthClientDetailsDto.class);

            return HandleResultMapper.wrapResult(oauthClientDetailsDto);
        }
        else {
            return HandleResultMapper.wrapResult(null);
        }
    }

    @Override
    public DataWrapper page(PageDataWrapper<OauthClientDetailsDto> pageDataWrapper) {
        Page<OauthClientDetails> page = new Page<>();
        page.setSize(pageDataWrapper.getPageSize());
        page.setCurrent(pageDataWrapper.getPageIndex());

        QueryWrapper<OauthClientDetails> queryWrapper = null;
        if (pageDataWrapper.getQueryObject() != null) {
            queryWrapper = new QueryWrapper<>();
            if (StringUtils.isNotEmpty(pageDataWrapper.getQueryObject().getClient_id())) {
                queryWrapper.lambda().like(OauthClientDetails::getClient_id, pageDataWrapper.getQueryObject().getClient_id());
            }
        }

        IPage<OauthClientDetails> pageResult = oauthClientDetailsService.page(page, queryWrapper);

        List<OauthClientDetailsDto> oauthClientDetailsDtoList = BeanConverter.copyList(pageResult.getRecords(), OauthClientDetailsDto.class);

        pageDataWrapper.setDataCount(pageResult.getTotal());
        pageDataWrapper.setData(oauthClientDetailsDtoList);

        return HandleResultMapper.wrapPage(pageDataWrapper);
    }

    @Override
    public DataWrapper find(OauthClientDetailsDto oauthClientDetailsDto) {

        QueryWrapper<OauthClientDetails> queryWrapper = new QueryWrapper<>();

        if (StringUtils.isNotEmpty(oauthClientDetailsDto.getClient_id())) {
            queryWrapper.lambda().eq(OauthClientDetails::getClient_id, oauthClientDetailsDto.getClient_id());
        }

        List<OauthClientDetails> userGroupList = oauthClientDetailsService.list(queryWrapper);

        List<OauthClientDetailsDto> oauthClientDetailsDtoList = BeanConverter.copyList(userGroupList, OauthClientDetailsDto.class);

        return HandleResultMapper.wrapResult(oauthClientDetailsDtoList);
    }
}
