package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.FlowNodeTypeDto;
import com.angelj.jcloudprovider.phm.api.model.vo.FlowNodeTypeVo;
import com.angelj.jcloudprovider.phm.api.service.FlowNodeTypeFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/flownodetype")
public class FlowNodeTypeController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/flow/flownodetype/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    FlowNodeTypeFeignApi flowNodeTypeFeignApi;

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
    public DataWrapper check(@RequestBody FlowNodeTypeVo flowNodeTypeVo) {

        FlowNodeTypeDto flowNodeTypeDto = BeanConverter.copyProperties(flowNodeTypeVo, FlowNodeTypeDto.class);

        return flowNodeTypeFeignApi.check(flowNodeTypeDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody FlowNodeTypeVo flowNodeTypeVo) {

        FlowNodeTypeDto flowNodeTypeDto = BeanConverter.copyProperties(flowNodeTypeVo, FlowNodeTypeDto.class);

        DataWrapper dataWrapper = flowNodeTypeFeignApi.check(flowNodeTypeDto);
        if (dataWrapper.success()) {
            dataWrapper = flowNodeTypeFeignApi.add(flowNodeTypeDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody FlowNodeTypeVo flowNodeTypeVo) {

        FlowNodeTypeDto flowNodeTypeDto = BeanConverter.copyProperties(flowNodeTypeVo, FlowNodeTypeDto.class);

        return flowNodeTypeFeignApi.update(flowNodeTypeDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return flowNodeTypeFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return flowNodeTypeFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, FlowNodeTypeVo flowNodeTypeVo) {

        if (flowNodeTypeVo != null) {
            FlowNodeTypeDto flowNodeTypeDto = BeanConverter.copyProperties(flowNodeTypeVo, FlowNodeTypeDto.class);

            pageDataWrapper.setQueryObject(flowNodeTypeDto);
        }

        return flowNodeTypeFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(FlowNodeTypeVo flowNodeTypeVo) {

        FlowNodeTypeDto flowNodeTypeDto = BeanConverter.copyProperties(flowNodeTypeVo, FlowNodeTypeDto.class);

        return flowNodeTypeFeignApi.find(flowNodeTypeDto);
    }
}