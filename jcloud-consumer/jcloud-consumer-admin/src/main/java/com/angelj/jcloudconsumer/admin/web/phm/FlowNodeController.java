package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.FlowNodeDto;
import com.angelj.jcloudprovider.phm.api.model.vo.FlowNodeVo;
import com.angelj.jcloudprovider.phm.api.service.FlowNodeFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/flownode")
public class FlowNodeController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/flow/flownode/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    FlowNodeFeignApi flowNodeFeignApi;

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
    public DataWrapper check(@RequestBody FlowNodeVo flowNodeVo) {

        FlowNodeDto flowNodeDto = BeanConverter.copyProperties(flowNodeVo, FlowNodeDto.class);

        return flowNodeFeignApi.check(flowNodeDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody FlowNodeVo flowNodeVo) {

        FlowNodeDto flowNodeDto = BeanConverter.copyProperties(flowNodeVo, FlowNodeDto.class);

        DataWrapper dataWrapper = flowNodeFeignApi.check(flowNodeDto);
        if (dataWrapper.success()) {
            dataWrapper = flowNodeFeignApi.add(flowNodeDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody FlowNodeVo flowNodeVo) {

        FlowNodeDto flowNodeDto = BeanConverter.copyProperties(flowNodeVo, FlowNodeDto.class);

        return flowNodeFeignApi.update(flowNodeDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return flowNodeFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return flowNodeFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, FlowNodeVo flowNodeVo) {

        if (flowNodeVo != null) {
            FlowNodeDto flowNodeDto = BeanConverter.copyProperties(flowNodeVo, FlowNodeDto.class);

            pageDataWrapper.setQueryObject(flowNodeDto);
        }

        return flowNodeFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(FlowNodeVo flowNodeVo) {

        FlowNodeDto flowNodeDto = BeanConverter.copyProperties(flowNodeVo, FlowNodeDto.class);

        return flowNodeFeignApi.find(flowNodeDto);
    }
}