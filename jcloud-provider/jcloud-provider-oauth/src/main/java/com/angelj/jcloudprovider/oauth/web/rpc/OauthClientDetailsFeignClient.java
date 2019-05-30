package com.angelj.jcloudprovider.oauth.web.rpc;

import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudprovider.oauth.api.model.dto.OauthClientDetailsDto;
import com.angelj.jcloudprovider.oauth.api.model.vo.OauthClientDetailsVo;
import com.angelj.jcloudprovider.oauth.api.service.OauthClientDetailsFeignApi;
import com.angelj.jcloudprovider.oauth.model.domain.OauthClientDetails;
import com.angelj.jcloudprovider.oauth.service.OauthClientDetailsService;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class OauthClientDetailsFeignClient implements OauthClientDetailsFeignApi {

    @Autowired
    OauthClientDetailsService oauthClientDetailsService;

    @Override
    public DataWrapper add(OauthClientDetailsDto oauthClientDetailsDto) {

        OauthClientDetails oauthClientDetails = null;
        BeanUtils.copyProperties(oauthClientDetailsDto, oauthClientDetails);

        boolean flag = oauthClientDetailsService.save(oauthClientDetails);
        return HandleResultMapper.wrap(flag);
    }

    @Override
    public DataWrapper update(OauthClientDetailsDto oauthClientDetailsDto) {

        OauthClientDetails oauthClientDetails = new OauthClientDetails();
        BeanUtils.copyProperties(oauthClientDetailsDto, oauthClientDetails);

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

        OauthClientDetailsDto oauthClientDetailsDto = new OauthClientDetailsDto();
        if (oauthClientDetails != null) {
            BeanUtils.copyProperties(oauthClientDetails, oauthClientDetailsDto);
        }

        return HandleResultMapper.wrapResult(oauthClientDetailsDto);
    }

    @Override
    public DataWrapper page(PageDataWrapper<OauthClientDetailsVo> pageDataWrapper) {
        Page<OauthClientDetails> page = new Page<>();
        page.setSize(pageDataWrapper.getPageSize());
        page.setCurrent(pageDataWrapper.getPageIndex());

        QueryWrapper<OauthClientDetails> queryWrapper = null;
        if (pageDataWrapper.getQueryObject() != null) {
            queryWrapper = new QueryWrapper<>();
            if (StringUtils.isNotEmpty(pageDataWrapper.getQueryObject().getClient_id())) {
                queryWrapper.lambda().eq(OauthClientDetails::getClient_id, pageDataWrapper.getQueryObject().getClient_id());
            }
        }

        IPage<OauthClientDetails> pageResult = oauthClientDetailsService.page(page, queryWrapper);

        pageDataWrapper.setDataCount(pageResult.getTotal());
        pageDataWrapper.setData(pageResult.getRecords());

        return HandleResultMapper.wrapPage(pageDataWrapper);
    }
}
