package com.angelj.jcloudconsumer.admin.exception.support.handler;

import com.angelj.jcloudcommon.util.wrapper.data.DataWrapper;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

public class JcloudBaseExceptionHandler {

    /*
    * 参考DefaultErrorAttributes获取错误信息的设置
    * */

    //获取SpringBoot错误标识
    private static final String ERROR_ATTRIBUTE = DefaultErrorAttributes.class.getName() + ".ERROR";
    private final boolean includeException = false;//不要错误exception

    @ExceptionHandler
    @ResponseBody
    public Map<String, Object> handlerException(HttpServletRequest request, HttpServletResponse response, Exception exception) {

        //不需要跟踪信息
        boolean includeStackTrace = false;
        ServletWebRequest webRequest = new ServletWebRequest(request, response);

        Map<String, Object> errorAttributes = new LinkedHashMap();
        errorAttributes.put("timestamp", new Date());
        this.addStatus(errorAttributes, webRequest);
        this.addErrorDetails(errorAttributes, webRequest, includeStackTrace);
        this.addPath(errorAttributes, webRequest);

        //进行补全
        if (!errorAttributes.containsKey("status")) {
            errorAttributes.put("status", DataWrapper.ERROR_CODE);
        }

        if (!errorAttributes.containsKey("path")) {
            errorAttributes.put("path", request.getRequestURI());
        }

        if (errorAttributes.containsKey("trace")) {
            errorAttributes.remove("trace");
        }

        if (errorAttributes.containsKey("status")) {
            errorAttributes.put("code", errorAttributes.get("status"));
        }

        //判断是否是AJAX请求
        boolean isAjax = false;
        if (request.getHeader("X-Requested-With").equals("XMLHttpRequest")) {
            isAjax = true;
        }

        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

        return errorAttributes;
    }

    private void addStatus(Map<String, Object> errorAttributes, RequestAttributes requestAttributes) {
        Integer status = (Integer) this.getAttribute(requestAttributes, "javax.servlet.error.status_code");
        if (status == null) {
            errorAttributes.put("status", Integer.valueOf(999));
            errorAttributes.put("error", "None");
        } else {
            errorAttributes.put("status", status);

            try {
                errorAttributes.put("error", HttpStatus.valueOf(status.intValue()).getReasonPhrase());
            } catch (Exception var5) {
                errorAttributes.put("error", "Http Status " + status);
            }

        }
    }

    private void addErrorDetails(Map<String, Object> errorAttributes, WebRequest webRequest, boolean includeStackTrace) {
        Throwable error = this.getError(webRequest);
        if (error != null) {
            while (true) {
                if (!(error instanceof ServletException) || error.getCause() == null) {
                    if (this.includeException) {
                        errorAttributes.put("exception", error.getClass().getName());
                    }

                    this.addErrorMessage(errorAttributes, error);
                    if (includeStackTrace) {
                        this.addStackTrace(errorAttributes, error);
                    }
                    break;
                }

                error = ((ServletException) error).getCause();
            }
        }

        Object message = this.getAttribute(webRequest, "javax.servlet.error.message");
        if ((!StringUtils.isEmpty(message) || errorAttributes.get("message") == null) && !(error instanceof BindingResult)) {
            errorAttributes.put("message", StringUtils.isEmpty(message) ? "No message available" : message);
        }

    }

    private void addErrorMessage(Map<String, Object> errorAttributes, Throwable error) {
        BindingResult result = this.extractBindingResult(error);
        if (result == null) {
            errorAttributes.put("message", error.getMessage());
        } else {
            if (result.hasErrors()) {
                errorAttributes.put("errors", result.getAllErrors());
                errorAttributes.put("message", "Validation failed for object='" + result.getObjectName() + "'. Error count: " + result.getErrorCount());
            } else {
                errorAttributes.put("message", "No errors");
            }

        }
    }

    private BindingResult extractBindingResult(Throwable error) {
        if (error instanceof BindingResult) {
            return (BindingResult) error;
        } else {
            return error instanceof MethodArgumentNotValidException ? ((MethodArgumentNotValidException) error).getBindingResult() : null;
        }
    }

    private void addStackTrace(Map<String, Object> errorAttributes, Throwable error) {
        StringWriter stackTrace = new StringWriter();
        error.printStackTrace(new PrintWriter(stackTrace));
        stackTrace.flush();
        errorAttributes.put("trace", stackTrace.toString());
    }

    private void addPath(Map<String, Object> errorAttributes, RequestAttributes requestAttributes) {
        String path = (String) this.getAttribute(requestAttributes, "javax.servlet.error.request_uri");
        if (path != null) {
            errorAttributes.put("path", path);
        }

    }

    public Throwable getError(WebRequest webRequest) {
        Throwable exception = (Throwable) this.getAttribute(webRequest, ERROR_ATTRIBUTE);
        if (exception == null) {
            exception = (Throwable) this.getAttribute(webRequest, "javax.servlet.error.exception");
        }

        return exception;
    }

    private Object getAttribute(RequestAttributes requestAttributes, String name) {
        return requestAttributes.getAttribute(name, 0);
    }
}
