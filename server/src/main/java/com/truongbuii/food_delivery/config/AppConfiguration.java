package com.truongbuii.food_delivery.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfiguration {
    @Bean
    public WebClient webClient() {
        return WebClient.builder().build();
    }

    @Value("${client-url}")
    private String clientUrl;  // Instance field

    public static String CLIENT_URL;

    @PostConstruct
    private void init() {
        CLIENT_URL = clientUrl;  // Assign injected value to static field
    }
}
