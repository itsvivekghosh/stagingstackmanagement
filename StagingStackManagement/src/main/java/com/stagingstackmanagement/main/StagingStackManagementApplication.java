package com.stagingstackmanagement.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StagingStackManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(StagingStackManagementApplication.class, args);
		System.out.println("Running at Server PORT: " + 8080);
		System.out.println("Click Here: 'http://localhost:8080'");
	}
}
