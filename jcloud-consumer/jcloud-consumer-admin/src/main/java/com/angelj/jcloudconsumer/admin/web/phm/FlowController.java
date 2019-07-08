package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.FlowDto;
import com.angelj.jcloudprovider.phm.api.model.vo.FlowVo;
import com.angelj.jcloudprovider.phm.api.service.FlowFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/flow")
public class FlowController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/flow/flow/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    FlowFeignApi flowFeignApi;

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

    @RequestMapping("/view/editor/{id}")
    public ModelAndView editor(@PathVariable("id") String id) {

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName(getViewPath("editor/index"));

        return modelAndView;
    }

    //------------------------------------页面处理事件-------------------------------------

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public DataWrapper check(@RequestBody FlowVo flowVo) {

        FlowDto flowDto = BeanConverter.copyProperties(flowVo, FlowDto.class);

        return flowFeignApi.check(flowDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody FlowVo flowVo) {

        FlowDto flowDto = BeanConverter.copyProperties(flowVo, FlowDto.class);

        DataWrapper dataWrapper = flowFeignApi.check(flowDto);
        if (dataWrapper.success()) {
            dataWrapper = flowFeignApi.add(flowDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody FlowVo flowVo) {

        FlowDto flowDto = BeanConverter.copyProperties(flowVo, FlowDto.class);

        return flowFeignApi.update(flowDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return flowFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return flowFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, FlowVo flowVo) {

        if (flowVo != null) {
            FlowDto flowDto = BeanConverter.copyProperties(flowVo, FlowDto.class);

            pageDataWrapper.setQueryObject(flowDto);
        }

        return flowFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(FlowVo flowVo) {

        FlowDto flowDto = BeanConverter.copyProperties(flowVo, FlowDto.class);

        return flowFeignApi.find(flowDto);
    }
}