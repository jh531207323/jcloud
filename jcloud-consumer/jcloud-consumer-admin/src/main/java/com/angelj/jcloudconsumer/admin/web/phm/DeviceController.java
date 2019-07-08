package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.DeviceDto;
import com.angelj.jcloudprovider.phm.api.model.vo.DeviceVo;
import com.angelj.jcloudprovider.phm.api.service.DeviceFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/device")
public class DeviceController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/device/device/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    DeviceFeignApi deviceFeignApi;

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
    public DataWrapper check(@RequestBody DeviceVo deviceVo) {

        DeviceDto deviceDto = BeanConverter.copyProperties(deviceVo, DeviceDto.class);

        return deviceFeignApi.check(deviceDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody DeviceVo deviceVo) {

        DeviceDto deviceDto = BeanConverter.copyProperties(deviceVo, DeviceDto.class);

        DataWrapper dataWrapper = deviceFeignApi.check(deviceDto);
        if (dataWrapper.success()) {
            dataWrapper = deviceFeignApi.add(deviceDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody DeviceVo deviceVo) {

        DeviceDto deviceDto = BeanConverter.copyProperties(deviceVo, DeviceDto.class);

        return deviceFeignApi.update(deviceDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return deviceFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return deviceFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, DeviceVo deviceVo) {

        if (deviceVo != null) {
            DeviceDto deviceDto = BeanConverter.copyProperties(deviceVo, DeviceDto.class);

            pageDataWrapper.setQueryObject(deviceDto);
        }

        return deviceFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(DeviceVo deviceVo) {

        DeviceDto deviceDto = BeanConverter.copyProperties(deviceVo, DeviceDto.class);

        return deviceFeignApi.find(deviceDto);
    }
}