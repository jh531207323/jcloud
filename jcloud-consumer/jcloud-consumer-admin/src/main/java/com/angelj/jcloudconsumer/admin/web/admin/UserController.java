package com.angelj.jcloudconsumer.admin.web.admin;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.admin.api.model.dto.UserDto;
import com.angelj.jcloudprovider.admin.api.model.vo.UserVo;
import com.angelj.jcloudprovider.admin.api.service.UserFeignApi;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping(value = "/admin/user")
public class UserController extends JcloudBaseExceptionHandler {

    private String viewFolder = "admin/user/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    UserFeignApi userFeignApi;

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
    public DataWrapper check(@RequestBody UserVo userVo) {

        UserDto userDto = BeanConverter.copyProperties(userVo, UserDto.class);

        return userFeignApi.check(userDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody UserVo userVo) {

        if (StringUtils.isNotEmpty(userVo.getIsEnable())) {
            userVo.setIsEnable(userVo.getIsEnable().equals("on") ? "Y" : "N");
        } else {
            userVo.setIsEnable("N");
        }

        UserDto userDto = BeanConverter.copyProperties(userVo, UserDto.class);

        DataWrapper dataWrapper = userFeignApi.check(userDto);
        if (dataWrapper.sucess()) {
            dataWrapper = userFeignApi.add(userDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody UserVo userVo) {

        UserDto userDto = BeanConverter.copyProperties(userVo, UserDto.class);

        return userFeignApi.update(userDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return userFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return userFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, UserVo userVo) {

        if (userVo != null) {
            UserDto userDto = BeanConverter.copyProperties(userVo, UserDto.class);

            pageDataWrapper.setQueryObject(userDto);
        }

        return userFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(UserVo userVo) {

        UserDto userDto = BeanConverter.copyProperties(userVo, UserDto.class);

        return userFeignApi.find(userDto);
    }

    @RequestMapping(value = "/login")
    public DataWrapper login(@RequestParam("userName") String userName, @RequestParam("password") String password) {
        return userFeignApi.login(userName, password);
    }
}
