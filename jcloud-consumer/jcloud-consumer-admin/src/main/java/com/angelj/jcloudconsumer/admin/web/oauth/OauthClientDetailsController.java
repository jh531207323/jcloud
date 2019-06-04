package com.angelj.jcloudconsumer.admin.web.oauth;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.oauth.api.model.dto.OauthClientDetailsDto;
import com.angelj.jcloudprovider.oauth.api.model.vo.OauthClientDetailsVo;
import com.angelj.jcloudprovider.oauth.api.service.OauthClientDetailsFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/oauth/oauthclientdetails")
public class OauthClientDetailsController extends JcloudBaseExceptionHandler {

    private String viewFolder = "oauth/oauthclientdetails/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    OauthClientDetailsFeignApi oauthClientDetailsFeignApi;

    @RequestMapping("/view/list")
    public ModelAndView list() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName(getViewPath("list"));

        return modelAndView;
    }

    @RequestMapping("/view/add")
    public ModelAndView add() {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName(getViewPath("add"));

        return modelAndView;
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public DataWrapper check(@RequestBody OauthClientDetailsDto oauthClientDetailsDto) {
        return oauthClientDetailsFeignApi.check(oauthClientDetailsDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody OauthClientDetailsDto oauthClientDetailsDto) {

        DataWrapper dataWrapper = oauthClientDetailsFeignApi.check(oauthClientDetailsDto);
        if(dataWrapper.sucess())
        {
            dataWrapper = oauthClientDetailsFeignApi.add(oauthClientDetailsDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody OauthClientDetailsDto oauthClientDetailsDto) {
        return oauthClientDetailsFeignApi.update(oauthClientDetailsDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return oauthClientDetailsFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("idList")  List<String> idList){
        return oauthClientDetailsFeignApi.delete(idList);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper<OauthClientDetailsVo> pageDataWrapper,OauthClientDetailsVo oauthClientDetailsVo) {
        pageDataWrapper.setQueryObject(oauthClientDetailsVo);
        return oauthClientDetailsFeignApi.page(pageDataWrapper);
    }

}