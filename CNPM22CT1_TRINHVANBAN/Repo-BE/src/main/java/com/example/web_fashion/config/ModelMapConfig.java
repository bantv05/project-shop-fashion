package com.example.web_fashion.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.ModelMap;
@Configuration
public class ModelMapConfig {
    @Bean
    public ModelMapper modelMap(){
        return new ModelMapper();
    }
}
