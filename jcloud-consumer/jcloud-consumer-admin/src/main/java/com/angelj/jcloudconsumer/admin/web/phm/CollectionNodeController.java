package com.angelj.jcloudconsumer.admin.web.phm;

import com.angelj.jcloudcommon.util.bean.BeanConverter;
import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import com.angelj.jcloudcommon.util.wrapper.data.PageDataWrapper;
import com.angelj.jcloudconsumer.admin.exception.support.handler.JcloudBaseExceptionHandler;
import com.angelj.jcloudprovider.phm.api.model.dto.CollectionNodeDto;
import com.angelj.jcloudprovider.phm.api.model.vo.CollectionNodeVo;
import com.angelj.jcloudprovider.phm.api.service.CollectionNodeFeignApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/phm/collectionnode")
public class CollectionNodeController extends JcloudBaseExceptionHandler {

    private String viewFolder = "phm/collection/collectionnode/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

    @Autowired
    CollectionNodeFeignApi collectionNodeFeignApi;

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
    public DataWrapper check(@RequestBody CollectionNodeVo collectionNodeVo) {

        CollectionNodeDto collectionNodeDto = BeanConverter.copyProperties(collectionNodeVo, CollectionNodeDto.class);

        return collectionNodeFeignApi.check(collectionNodeDto);
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public DataWrapper add(@RequestBody CollectionNodeVo collectionNodeVo) {

        CollectionNodeDto collectionNodeDto = BeanConverter.copyProperties(collectionNodeVo, CollectionNodeDto.class);

        DataWrapper dataWrapper = collectionNodeFeignApi.check(collectionNodeDto);
        if (dataWrapper.success()) {
            dataWrapper = collectionNodeFeignApi.add(collectionNodeDto);
        }

        return dataWrapper;
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public DataWrapper update(@RequestBody CollectionNodeVo collectionNodeVo) {

        CollectionNodeDto collectionNodeDto = BeanConverter.copyProperties(collectionNodeVo, CollectionNodeDto.class);

        return collectionNodeFeignApi.update(collectionNodeDto);
    }

    @RequestMapping(value = "/delete")
    public DataWrapper delete(@RequestParam("idList") List<String> idList) {
        return collectionNodeFeignApi.delete(idList);
    }

    @RequestMapping(value = "/get/{id}")
    public DataWrapper get(@PathVariable("id") String id) {
        return collectionNodeFeignApi.get(id);
    }


    @RequestMapping(value = "/page")
    public DataWrapper page(PageDataWrapper pageDataWrapper, CollectionNodeVo collectionNodeVo) {

        if (collectionNodeVo != null) {
            CollectionNodeDto collectionNodeDto = BeanConverter.copyProperties(collectionNodeVo, CollectionNodeDto.class);

            pageDataWrapper.setQueryObject(collectionNodeDto);
        }

        return collectionNodeFeignApi.page(pageDataWrapper);
    }

    @RequestMapping(value = "/find")
    public DataWrapper page(CollectionNodeVo collectionNodeVo) {

        CollectionNodeDto collectionNodeDto = BeanConverter.copyProperties(collectionNodeVo, CollectionNodeDto.class);

        return collectionNodeFeignApi.find(collectionNodeDto);
    }
}