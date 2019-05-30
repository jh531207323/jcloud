package com.angelj.jcloudconsumer.admin.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/admin")
public class HomeController {


    @RequestMapping("/index")
    public ModelAndView index()
    {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index");

        return modelAndView;
    }

    @RequestMapping("/index2")
    public ModelAndView index2()
    {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("index2");

        return modelAndView;
    }
}
