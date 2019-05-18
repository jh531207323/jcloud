package com.angelj.jcloudeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class JcloudEurekaApplication {

	public static void main(String[] args) {
		SpringApplication.run(JcloudEurekaApplication.class, args);
	}

}
