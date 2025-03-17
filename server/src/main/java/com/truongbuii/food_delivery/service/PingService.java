package com.truongbuii.food_delivery.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class PingService {
    private final RestTemplate restTemplate = new RestTemplate();
    @Value("${backend-url}")
    private String BACKEND_URL;

    /*
     * This service is used to prevent render server from sleeping after 15 minutes of inactivity
     */
    @Scheduled(cron = "0 */14 * * * *")
    public void pingBackend() {
        try {
            restTemplate.postForObject(BACKEND_URL, null, String.class);
            log.info("Ping backend after 14 minutes");
        } catch (Exception e) {
            log.error("Error while pinging backend server: {}", e.getMessage());
        }
    }
}
