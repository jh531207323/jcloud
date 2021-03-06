package com.angelj.jcloudconsumer.admin.exception.support.controller;

import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.error.ErrorAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public class JcloudBasicErrorController extends BasicErrorController {

    public JcloudBasicErrorController(ErrorAttributes errorAttributes,
                                      ErrorProperties errorProperties,
                                      List<ErrorViewResolver> errorViewResolvers) {
        super(errorAttributes, errorProperties, errorViewResolvers);
    }


    /*
    * 重新springboot默认的返回错误信息，以适应前台ajax处理
    {
        error: "Internal Server Error"
        message: "com.netflix.client.ClientException: Load balancer does not have available server for client: jcloud-provider-oauth"
        path: "/oauth/oauthclientdetails/add"
        status: 500
        timestamp: "2019-06-01T14:03:39.865+0000"
        trace: "java.lang.RuntimeException: com.netflix.client.Cli...."
    }
    * */

    @Override
    protected Map<String, Object> getErrorAttributes(HttpServletRequest request, boolean includeStackTrace) {
        Map<String, Object> errorAttributes = super.getErrorAttributes(request, includeStackTrace);

        if (errorAttributes.containsKey("trace")) {
            errorAttributes.remove("trace");
        }

        if (errorAttributes.containsKey("status")) {
            errorAttributes.put("code", errorAttributes.get("status"));
        }

        return errorAttributes;
    }
}
