package com.angelj.jcloudprovider.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class JcloudProviderAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(JcloudProviderAdminApplication.class, args);
    }
}
