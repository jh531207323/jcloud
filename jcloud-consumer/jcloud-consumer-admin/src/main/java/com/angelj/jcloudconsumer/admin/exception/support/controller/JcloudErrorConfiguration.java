package com.angelj.jcloudconsumer.admin.exception.support.controller;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class JcloudErrorConfiguration {

    @Bean
    public JcloudBasicErrorController jcloudBasicErrorController(ErrorAttributes errorAttributes,
                                                                 ServerProperties serverProperties,
                                                                 ObjectProvider<List<ErrorViewResolver>> errorViewResolversProvider) {
        return new JcloudBasicErrorController(errorAttributes, serverProperties.getError(), errorViewResolversProvider.getIfAvailable());
    }
}
