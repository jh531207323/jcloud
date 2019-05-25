package com.angelj.jcloudauth;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EnableDiscoveryClient
//@EnableResourceServer
@MapperScan("com.angelj.jcloudauth.mapper")
public class JcloudAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(JcloudAuthApplication.class, args);
	}

}
