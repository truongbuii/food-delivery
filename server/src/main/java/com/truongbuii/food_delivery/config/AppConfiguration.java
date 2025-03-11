package com.truongbuii.food_delivery.config;

import com.truongbuii.food_delivery.model.entity.User;
import com.truongbuii.food_delivery.model.enums.Role;
import com.truongbuii.food_delivery.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@RequiredArgsConstructor
public class AppConfiguration {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    /* Setting up WebClient for making HTTP requests to other services [Brevo] */
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

    @Bean
    CommandLineRunner initAdmin() {
        return args -> {
            var admin = userRepository.findByEmail("admin@gmail.com");
            if (admin.isEmpty()) {
                User newAdmin = new User();
                newAdmin.setFullName("Admin");
                newAdmin.setEmail("admin@gmail.com");
                newAdmin.setPassword(passwordEncoder.encode("123123"));
                newAdmin.setRole(Role.ADMIN);
                newAdmin.setEmailVerified(Boolean.TRUE);
                newAdmin.setUserActive(Boolean.TRUE);
                userRepository.save(newAdmin);
            }
        };
    }
}
