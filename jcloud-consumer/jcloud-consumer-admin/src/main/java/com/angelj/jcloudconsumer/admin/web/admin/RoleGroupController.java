package com.angelj.jcloudconsumer.admin.web.admin;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleGroupDto;
import com.angelj.jcloudprovider.admin.api.model.vo.RoleGroupVo;
import com.angelj.jcloudprovider.admin.api.service.RoleGroupFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/admin/rolegroup")
public class RoleGroupController extends JcloudBaseExceptionHandler {

    private String viewFolder = "admin/rolegroup/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    RoleGroupFeignApi roleGroupFeignApi;

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
    public DataWrapper check(@RequestBody RoleGroupVo roleGroupVo) {

        RoleGroupDto roleGroupDto = BeanConverter.copyProperties(roleGroupVo, RoleGroupDto.class);

        return roleGroupFeignApi.check(roleGroupDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody RoleGroupVo roleGroupVo) {

        RoleGroupDto roleGroupDto = BeanConverter.copyProperties(roleGroupVo, RoleGroupDto.class);

        DataWrapper dataWrapper = roleGroupFeignApi.check(roleGroupDto);
        if (dataWrapper.sucess()) {
            dataWrapper = roleGroupFeignApi.add(roleGroupDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody RoleGroupVo roleGroupVo) {

        RoleGroupDto roleGroupDto = BeanConverter.copyProperties(roleGroupVo, RoleGroupDto.class);

        return roleGroupFeignApi.update(roleGroupDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return roleGroupFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return roleGroupFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, RoleGroupVo roleGroupVo) {

        if (roleGroupVo != null) {
            RoleGroupDto roleGroupDto = BeanConverter.copyProperties(roleGroupVo, RoleGroupDto.class);

            pageDataWrapper.setQueryObject(roleGroupDto);
        }

        return roleGroupFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(RoleGroupVo roleGroupVo) {

        RoleGroupDto roleGroupDto = BeanConverter.copyProperties(roleGroupVo, RoleGroupDto.class);

        return roleGroupFeignApi.find(roleGroupDto);
    }
}