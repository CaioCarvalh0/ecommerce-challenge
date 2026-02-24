package com.mini.ecommerce;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication {


	public static void main(String[] args) {
		var logger = LoggerFactory.getLogger(EcommerceApplication.class);
		SpringApplication.run(EcommerceApplication.class, args);
		logger.info(">> Aplicação Iniciada");
	}

}
