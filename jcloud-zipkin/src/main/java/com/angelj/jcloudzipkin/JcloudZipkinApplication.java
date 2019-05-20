package com.angelj.jcloudzipkin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import zipkin.server.internal.EnableZipkinServer;


@SpringBootApplication
@EnableZipkinServer
public class JcloudZipkinApplication {

	public static void main(String[] args) {
		SpringApplication.run(JcloudZipkinApplication.class, args);
	}

}
