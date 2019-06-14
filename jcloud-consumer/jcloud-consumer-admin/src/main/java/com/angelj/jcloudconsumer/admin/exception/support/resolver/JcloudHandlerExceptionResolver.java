package com.angelj.jcloudconsumer.admin.exception.support.resolver;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.core.Ordered;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.lang.Nullable;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Set;

/*
* 实现类似DefaultHandlerExceptionResolver的功能
* */

public class JcloudHandlerExceptionResolver implements HandlerExceptionResolver {

    public static final String PAGE_NOT_FOUND_LOG_CATEGORY = "org.springframework.web.servlet.PageNotFound";
    protected static final Log pageNotFoundLogger = LogFactory.getLog("org.springframework.web.servlet.PageNotFound");

    private static final String HEADER_CACHE_CONTROL = "Cache-Control";
    protected final Log logger = LogFactory.getLog(this.getClass());
    private int order = 2147483647;
    @Nullable
    private Set<?> mappedHandlers;
    @Nullable
    private Class<?>[] mappedHandlerClasses;
    @Nullable
    private Log warnLogger;
    private boolean preventResponseCaching = false;

    public void setOrder(int order) {
        this.order = order;
    }

    public int getOrder() {
        return this.order;
    }

    public void setMappedHandlers(Set<?> mappedHandlers) {
        this.mappedHandlers = mappedHandlers;
    }

    public void setMappedHandlerClasses(Class... mappedHandlerClasses) {
        this.mappedHandlerClasses = mappedHandlerClasses;
    }

    public void setWarnLogCategory(String loggerName) {
        this.warnLogger = !StringUtils.isEmpty(loggerName) ? LogFactory.getLog(loggerName) : null;
    }

    public void setPreventResponseCaching(boolean preventResponseCaching) {
        this.preventResponseCaching = preventResponseCaching;
    }

    public JcloudHandlerExceptionResolver() {
        this.setOrder(Ordered.HIGHEST_PRECEDENCE);
        this.setWarnLogCategory(this.getClass().getName());
    }

    @Nullable
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, @Nullable Object handler, Exception ex) {
        if (!this.shouldApplyTo(request, handler)) {
            return null;
        } else {
            this.prepareResponse(ex, response);
            ModelAndView result = this.doResolveException(request, response, handler, ex);
            if (result != null) {
                if (this.logger.isDebugEnabled() && (this.warnLogger == null || !this.warnLogger.isWarnEnabled())) {
                    this.logger.debug("Resolved [" + ex + "]" + (result.isEmpty() ? "" : " to " + result));
                }

                this.logException(ex, request);
            }

            return result;
        }
    }

    protected boolean shouldApplyTo(HttpServletRequest request, @Nullable Object handler) {
        if (handler != null) {
            if (this.mappedHandlers != null && this.mappedHandlers.contains(handler)) {
                return true;
            }

            if (this.mappedHandlerClasses != null) {
                Class[] var3 = this.mappedHandlerClasses;
                int var4 = var3.length;

                for(int var5 = 0; var5 < var4; ++var5) {
                    Class<?> handlerClass = var3[var5];
                    if (handlerClass.isInstance(handler)) {
                        return true;
                    }
                }
            }
        }

        return this.mappedHandlers == null && this.mappedHandlerClasses == null;
    }

    protected void logException(Exception ex, HttpServletRequest request) {
        if (this.warnLogger != null && this.warnLogger.isWarnEnabled()) {
            this.warnLogger.warn(this.buildLogMessage(ex, request));
        }

    }

    protected String buildLogMessage(Exception ex, HttpServletRequest request) {
        return "Resolved [" + ex + "]";
    }

    protected void prepareResponse(Exception ex, HttpServletResponse response) {
        if (this.preventResponseCaching) {
            this.preventCaching(response);
        }

    }

    protected void preventCaching(HttpServletResponse response) {
        response.addHeader("Cache-Control", "no-store");
    }

    protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, @Nullable Object handler, Exception ex) {
        try {
            if (ex instanceof HttpRequestMethodNotSupportedException) {
                return this.handleHttpRequestMethodNotSupported((HttpRequestMethodNotSupportedException)ex, request, response, handler);
            }

            if (ex instanceof HttpMediaTypeNotSupportedException) {
                return this.handleHttpMediaTypeNotSupported((HttpMediaTypeNotSupportedException)ex, request, response, handler);
            }

            if (ex instanceof HttpMediaTypeNotAcceptableException) {
                return this.handleHttpMediaTypeNotAcceptable((HttpMediaTypeNotAcceptableException)ex, request, response, handler);
            }

            if (ex instanceof MissingPathVariableException) {
                return this.handleMissingPathVariable((MissingPathVariableException)ex, request, response, handler);
            }

            if (ex instanceof MissingServletRequestParameterException) {
                return this.handleMissingServletRequestParameter((MissingServletRequestParameterException)ex, request, response, handler);
            }

            if (ex instanceof ServletRequestBindingException) {
                return this.handleServletRequestBindingException((ServletRequestBindingException)ex, request, response, handler);
            }

            if (ex instanceof ConversionNotSupportedException) {
                return this.handleConversionNotSupported((ConversionNotSupportedException)ex, request, response, handler);
            }

            if (ex instanceof TypeMismatchException) {
                return this.handleTypeMismatch((TypeMismatchException)ex, request, response, handler);
            }

            if (ex instanceof HttpMessageNotReadableException) {
                return this.handleHttpMessageNotReadable((HttpMessageNotReadableException)ex, request, response, handler);
            }

            if (ex instanceof HttpMessageNotWritableException) {
                return this.handleHttpMessageNotWritable((HttpMessageNotWritableException)ex, request, response, handler);
            }

            if (ex instanceof MethodArgumentNotValidException) {
                return this.handleMethodArgumentNotValidException((MethodArgumentNotValidException)ex, request, response, handler);
            }

            if (ex instanceof MissingServletRequestPartException) {
                return this.handleMissingServletRequestPartException((MissingServletRequestPartException)ex, request, response, handler);
            }

            if (ex instanceof BindException) {
                return this.handleBindException((BindException)ex, request, response, handler);
            }

            if (ex instanceof NoHandlerFoundException) {
                return this.handleNoHandlerFoundException((NoHandlerFoundException)ex, request, response, handler);
            }

            if (ex instanceof AsyncRequestTimeoutException) {
                return this.handleAsyncRequestTimeoutException((AsyncRequestTimeoutException)ex, request, response, handler);
            }
        } catch (Exception var6) {
            if (this.logger.isWarnEnabled()) {
                this.logger.warn("Failure while trying to resolve exception [" + ex.getClass().getName() + "]", var6);
            }
        }

        return null;
    }

    protected ModelAndView handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        String[] supportedMethods = ex.getSupportedMethods();
        if (supportedMethods != null) {
            response.setHeader("Allow", StringUtils.arrayToDelimitedString(supportedMethods, ", "));
        }

        response.sendError(405, ex.getMessage());
        return new ModelAndView();
    }

    protected ModelAndView handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(415);
        List<MediaType> mediaTypes = ex.getSupportedMediaTypes();
        if (!CollectionUtils.isEmpty(mediaTypes)) {
            response.setHeader("Accept", MediaType.toString(mediaTypes));
        }

        return new ModelAndView();
    }

    protected ModelAndView handleHttpMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(406);
        return new ModelAndView();
    }

    protected ModelAndView handleMissingPathVariable(MissingPathVariableException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(500, ex.getMessage());
        return new ModelAndView();
    }

    protected ModelAndView handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400, ex.getMessage());
        return new ModelAndView();
    }

    protected ModelAndView handleServletRequestBindingException(ServletRequestBindingException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400, ex.getMessage());
        return new ModelAndView();
    }

    protected ModelAndView handleConversionNotSupported(ConversionNotSupportedException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        this.sendServerError(ex, request, response);
        return new ModelAndView();
    }

    protected ModelAndView handleTypeMismatch(TypeMismatchException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400);
        return new ModelAndView();
    }

    protected ModelAndView handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400);
        return new ModelAndView();
    }

    protected ModelAndView handleHttpMessageNotWritable(HttpMessageNotWritableException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        this.sendServerError(ex, request, response);
        return new ModelAndView();
    }

    protected ModelAndView handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400);
        return new ModelAndView();
    }

    protected ModelAndView handleMissingServletRequestPartException(MissingServletRequestPartException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400, ex.getMessage());
        return new ModelAndView();
    }

    protected ModelAndView handleBindException(BindException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        response.sendError(400);
        return new ModelAndView();
    }

    protected ModelAndView handleNoHandlerFoundException(NoHandlerFoundException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        pageNotFoundLogger.warn(ex.getMessage());
        response.sendError(404);
        return new ModelAndView();
    }

    protected ModelAndView handleAsyncRequestTimeoutException(AsyncRequestTimeoutException ex, HttpServletRequest request, HttpServletResponse response, @Nullable Object handler) throws IOException {
        if (!response.isCommitted()) {
            response.sendError(503);
        } else {
            this.logger.warn("Async request timed out");
        }

        return new ModelAndView();
    }

    protected void sendServerError(Exception ex, HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setAttribute("javax.servlet.error.exception", ex);
        response.sendError(500);
    }
}
