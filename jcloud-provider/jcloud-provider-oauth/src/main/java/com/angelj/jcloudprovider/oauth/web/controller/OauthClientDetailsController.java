package com.angelj.jcloudprovider.oauth.web.controller;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.HandleResultMapper;
import com.angelj.jcloudprovider.oauth.model.domain.OauthClientDetails;
import com.angelj.jcloudprovider.oauth.service.OauthClientDetailsService;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/oauthclientdetails")
public class OauthClientDetailsController {

    @Autowired
    OauthClientDetailsService oauthClientDetailsService;

    @PostMapping("add")
    public DataWrapper add(OauthClientDetails oauthClientDetails) {

        boolean flag = oauthClientDetailsService.save(oauthClientDetails);
        return HandleResultMapper.wrap(flag);
    }

    @PostMapping("update")
    public DataWrapper update(OauthClientDetails oauthClientDetails) {
        boolean flag = oauthClientDetailsService.updateById(oauthClientDetails);
        return HandleResultMapper.wrap(flag);
    }

    @PostMapping("delete")
    public DataWrapper delete(List<String> idList) {
        boolean flag = oauthClientDetailsService.removeByIds(idList);
        return HandleResultMapper.wrap(flag);
    }

    @PostMapping("page")
    public DataWrapper page(Page<OauthClientDetails> page) {
        IPage<OauthClientDetails> pageResult = oauthClientDetailsService.page(page);
        return HandleResultMapper.wrapPage(pageResult);
    }
}
