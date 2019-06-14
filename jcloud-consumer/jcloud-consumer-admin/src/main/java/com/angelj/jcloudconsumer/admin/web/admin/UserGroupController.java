package com.angelj.jcloudconsumer.admin.web.admin;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.admin.api.model.dto.UserGroupDto;
import com.angelj.jcloudprovider.admin.api.model.vo.UserGroupVo;
import com.angelj.jcloudprovider.admin.api.service.UserGroupFeignApi;
import com.angelj.jcloudprovider.oauth.api.model.dto.OauthClientDetailsDto;
import com.angelj.jcloudprovider.oauth.api.model.vo.OauthClientDetailsVo;
import com.angelj.jcloudprovider.oauth.api.service.OauthClientDetailsFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/admin/usergroup")
public class UserGroupController extends JcloudBaseExceptionHandler {

    private String viewFolder = "admin/usergroup/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    UserGroupFeignApi userGroupFeignApi;

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

    //------------------------------------页面处理事件-------------------------------------

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public DataWrapper check(@RequestBody UserGroupVo userGroupVo) {

        UserGroupDto userGroupDto = BeanConverter.copyProperties(userGroupVo, UserGroupDto.class);

        return userGroupFeignApi.check(userGroupDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody UserGroupVo userGroupVo) {

        UserGroupDto userGroupDto = BeanConverter.copyProperties(userGroupVo, UserGroupDto.class);

        DataWrapper dataWrapper = userGroupFeignApi.check(userGroupDto);
        if (dataWrapper.sucess()) {
            dataWrapper = userGroupFeignApi.add(userGroupDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody UserGroupVo userGroupVo) {

        UserGroupDto userGroupDto = BeanConverter.copyProperties(userGroupVo, UserGroupDto.class);

        return userGroupFeignApi.update(userGroupDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return userGroupFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return userGroupFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, UserGroupVo userGroupVo) {

        if (userGroupVo != null) {
            UserGroupDto userGroupDto = BeanConverter.copyProperties(userGroupVo, UserGroupDto.class);

            pageDataWrapper.setQueryObject(userGroupDto);
        }

        return userGroupFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(UserGroupVo userGroupVo) {

        UserGroupDto userGroupDto = BeanConverter.copyProperties(userGroupVo, UserGroupDto.class);

        return userGroupFeignApi.find(userGroupDto);
    }
}