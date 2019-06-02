package com.angelj.jcloudconsumer.admin.exception.support.resolver;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JcloudHandlerExceptionConfigruation {

    @Bean
    public JcloudHandlerExceptionResolver jcloudHandlerExceptionResolver()
    {
        return new JcloudHandlerExceptionResolver();
    }
}
