package com.angelj.jcloudconsumer.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = {"com.angelj.jcloudprovider.admin.api"})
@EnableHystrix
public class JcloudConsumerAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(JcloudConsumerAdminApplication.class, args);
	}

}
