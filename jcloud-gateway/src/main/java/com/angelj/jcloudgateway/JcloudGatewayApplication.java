package com.angelj.jcloudgateway;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableDiscoveryClient
@RestController
public class JcloudGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(JcloudGatewayApplication.class, args);
    }

    @Value("${key}") // git配置文件里的key
    String myww;

    @RequestMapping(value = "/hi")
    public String hi() {
        return myww;
    }

}
