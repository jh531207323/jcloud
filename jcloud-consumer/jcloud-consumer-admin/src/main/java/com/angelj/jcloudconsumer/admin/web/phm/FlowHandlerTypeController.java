package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.FlowHandlerTypeDto;
import com.angelj.jcloudprovider.phm.api.model.vo.FlowHandlerTypeVo;
import com.angelj.jcloudprovider.phm.api.service.FlowHandlerTypeFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/flowhandlertype")
public class FlowHandlerTypeController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/flow/flowhandlertype/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    FlowHandlerTypeFeignApi flowHandlerTypeFeignApi;

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
    public DataWrapper check(@RequestBody FlowHandlerTypeVo flowHandlerTypeVo) {

        FlowHandlerTypeDto flowHandlerTypeDto = BeanConverter.copyProperties(flowHandlerTypeVo, FlowHandlerTypeDto.class);

        return flowHandlerTypeFeignApi.check(flowHandlerTypeDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody FlowHandlerTypeVo flowHandlerTypeVo) {

        FlowHandlerTypeDto flowHandlerTypeDto = BeanConverter.copyProperties(flowHandlerTypeVo, FlowHandlerTypeDto.class);

        DataWrapper dataWrapper = flowHandlerTypeFeignApi.check(flowHandlerTypeDto);
        if (dataWrapper.success()) {
            dataWrapper = flowHandlerTypeFeignApi.add(flowHandlerTypeDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody FlowHandlerTypeVo flowHandlerTypeVo) {

        FlowHandlerTypeDto flowHandlerTypeDto = BeanConverter.copyProperties(flowHandlerTypeVo, FlowHandlerTypeDto.class);

        return flowHandlerTypeFeignApi.update(flowHandlerTypeDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return flowHandlerTypeFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return flowHandlerTypeFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, FlowHandlerTypeVo flowHandlerTypeVo) {

        if (flowHandlerTypeVo != null) {
            FlowHandlerTypeDto flowHandlerTypeDto = BeanConverter.copyProperties(flowHandlerTypeVo, FlowHandlerTypeDto.class);

            pageDataWrapper.setQueryObject(flowHandlerTypeDto);
        }

        return flowHandlerTypeFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(FlowHandlerTypeVo flowHandlerTypeVo) {

        FlowHandlerTypeDto flowHandlerTypeDto = BeanConverter.copyProperties(flowHandlerTypeVo, FlowHandlerTypeDto.class);

        return flowHandlerTypeFeignApi.find(flowHandlerTypeDto);
    }
}