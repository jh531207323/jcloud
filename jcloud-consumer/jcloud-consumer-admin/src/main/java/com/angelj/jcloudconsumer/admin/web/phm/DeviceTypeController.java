package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.DeviceTypeDto;
import com.angelj.jcloudprovider.phm.api.model.vo.DeviceTypeVo;
import com.angelj.jcloudprovider.phm.api.service.DeviceTypeFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/devicetype")
public class DeviceTypeController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/device/devicetype/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    DeviceTypeFeignApi deviceTypeFeignApi;

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
    public DataWrapper check(@RequestBody DeviceTypeVo deviceTypeVo) {

        DeviceTypeDto deviceTypeDto = BeanConverter.copyProperties(deviceTypeVo, DeviceTypeDto.class);

        return deviceTypeFeignApi.check(deviceTypeDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody DeviceTypeVo deviceTypeVo) {

        DeviceTypeDto deviceTypeDto = BeanConverter.copyProperties(deviceTypeVo, DeviceTypeDto.class);

        DataWrapper dataWrapper = deviceTypeFeignApi.check(deviceTypeDto);
        if (dataWrapper.success()) {
            dataWrapper = deviceTypeFeignApi.add(deviceTypeDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody DeviceTypeVo deviceTypeVo) {

        DeviceTypeDto deviceTypeDto = BeanConverter.copyProperties(deviceTypeVo, DeviceTypeDto.class);

        return deviceTypeFeignApi.update(deviceTypeDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return deviceTypeFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return deviceTypeFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, DeviceTypeVo deviceTypeVo) {

        if (deviceTypeVo != null) {
            DeviceTypeDto deviceTypeDto = BeanConverter.copyProperties(deviceTypeVo, DeviceTypeDto.class);

            pageDataWrapper.setQueryObject(deviceTypeDto);
        }

        return deviceTypeFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(DeviceTypeVo deviceTypeVo) {

        DeviceTypeDto deviceTypeDto = BeanConverter.copyProperties(deviceTypeVo, DeviceTypeDto.class);

        return deviceTypeFeignApi.find(deviceTypeDto);
    }
}