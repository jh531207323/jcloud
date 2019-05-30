package com.angelj.jcloudconsumer.admin.web.admin;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/admin/role")
public class RoleController {

    private String viewFolder = "admin/role/";

    private String getViewPath(String viewName) {
        return viewFolder + viewName;
    }

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
}
