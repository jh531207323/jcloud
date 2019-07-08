package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.CollectionTypeDto;
import com.angelj.jcloudprovider.phm.api.model.vo.CollectionTypeVo;
import com.angelj.jcloudprovider.phm.api.service.CollectionTypeFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/collectiontype")
public class CollectionTypeController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/collection/collectiontype/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    CollectionTypeFeignApi collectionTypeFeignApi;

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
    public DataWrapper check(@RequestBody CollectionTypeVo collectionTypeVo) {

        CollectionTypeDto collectionTypeDto = BeanConverter.copyProperties(collectionTypeVo, CollectionTypeDto.class);

        return collectionTypeFeignApi.check(collectionTypeDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody CollectionTypeVo collectionTypeVo) {

        CollectionTypeDto collectionTypeDto = BeanConverter.copyProperties(collectionTypeVo, CollectionTypeDto.class);

        DataWrapper dataWrapper = collectionTypeFeignApi.check(collectionTypeDto);
        if (dataWrapper.success()) {
            dataWrapper = collectionTypeFeignApi.add(collectionTypeDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody CollectionTypeVo collectionTypeVo) {

        CollectionTypeDto collectionTypeDto = BeanConverter.copyProperties(collectionTypeVo, CollectionTypeDto.class);

        return collectionTypeFeignApi.update(collectionTypeDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return collectionTypeFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return collectionTypeFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, CollectionTypeVo collectionTypeVo) {

        if (collectionTypeVo != null) {
            CollectionTypeDto collectionTypeDto = BeanConverter.copyProperties(collectionTypeVo, CollectionTypeDto.class);

            pageDataWrapper.setQueryObject(collectionTypeDto);
        }

        return collectionTypeFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(CollectionTypeVo collectionTypeVo) {

        CollectionTypeDto collectionTypeDto = BeanConverter.copyProperties(collectionTypeVo, CollectionTypeDto.class);

        return collectionTypeFeignApi.find(collectionTypeDto);
    }
}