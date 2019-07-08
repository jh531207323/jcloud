package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.FlowHandlerDto;
import com.angelj.jcloudprovider.phm.api.model.vo.FlowHandlerVo;
import com.angelj.jcloudprovider.phm.api.service.FlowHandlerFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/flowhandler")
public class FlowHandlerController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/flow/flowHandler/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    FlowHandlerFeignApi flowHandlerFeignApi;

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
    public DataWrapper check(@RequestBody FlowHandlerVo flowHandlerVo) {

        FlowHandlerDto flowHandlerDto = BeanConverter.copyProperties(flowHandlerVo, FlowHandlerDto.class);

        return flowHandlerFeignApi.check(flowHandlerDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody FlowHandlerVo flowHandlerVo) {

        FlowHandlerDto flowHandlerDto = BeanConverter.copyProperties(flowHandlerVo, FlowHandlerDto.class);

        DataWrapper dataWrapper = flowHandlerFeignApi.check(flowHandlerDto);
        if (dataWrapper.success()) {
            dataWrapper = flowHandlerFeignApi.add(flowHandlerDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody FlowHandlerVo flowHandlerVo) {

        FlowHandlerDto flowHandlerDto = BeanConverter.copyProperties(flowHandlerVo, FlowHandlerDto.class);

        return flowHandlerFeignApi.update(flowHandlerDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return flowHandlerFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return flowHandlerFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, FlowHandlerVo flowHandlerVo) {

        if (flowHandlerVo != null) {
            FlowHandlerDto flowHandlerDto = BeanConverter.copyProperties(flowHandlerVo, FlowHandlerDto.class);

            pageDataWrapper.setQueryObject(flowHandlerDto);
        }

        return flowHandlerFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(FlowHandlerVo flowHandlerVo) {

        FlowHandlerDto flowHandlerDto = BeanConverter.copyProperties(flowHandlerVo, FlowHandlerDto.class);

        return flowHandlerFeignApi.find(flowHandlerDto);
    }
}