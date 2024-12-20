package com.example.web_fashion;

import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.logging.Logger;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.web_fashion.repository")

public class WebFashionApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(WebFashionApplication.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(WebFashionApplication.class, args);
	}

}
