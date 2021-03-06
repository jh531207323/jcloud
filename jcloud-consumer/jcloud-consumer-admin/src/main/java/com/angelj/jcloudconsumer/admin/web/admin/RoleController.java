package com.angelj.jcloudconsumer.admin.web.admin;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.admin.api.model.dto.RoleDto;
import com.angelj.jcloudprovider.admin.api.model.vo.RoleVo;
import com.angelj.jcloudprovider.admin.api.service.RoleFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/admin/role")
public class RoleController extends JcloudBaseExceptionHandler {

    private String viewFolder = "admin/role/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    RoleFeignApi roleFeignApi;

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
    public DataWrapper check(@RequestBody RoleVo roleVo) {

        RoleDto roleDto = BeanConverter.copyProperties(roleVo, RoleDto.class);

        return roleFeignApi.check(roleDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody RoleVo roleVo) {

        RoleDto roleDto = BeanConverter.copyProperties(roleVo, RoleDto.class);

        DataWrapper dataWrapper = roleFeignApi.check(roleDto);
        if (dataWrapper.sucess()) {
            dataWrapper = roleFeignApi.add(roleDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody RoleVo roleVo) {

        RoleDto roleDto = BeanConverter.copyProperties(roleVo, RoleDto.class);

        return roleFeignApi.update(roleDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return roleFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return roleFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, RoleVo roleVo) throws IllegalAccessException, IOException, InstantiationException {

        if (roleVo != null) {
            RoleDto roleDto = BeanConverter.copyProperties(roleVo, RoleDto.class);

            pageDataWrapper.setQueryObject(roleDto);
        }

        return roleFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(RoleVo roleVo) {

        RoleDto roleDto = BeanConverter.copyProperties(roleVo, RoleDto.class);

        return roleFeignApi.find(roleDto);
    }
}