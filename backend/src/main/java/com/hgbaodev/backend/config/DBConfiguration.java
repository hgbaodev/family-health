package com.hgbaodev.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Configuration
@ConfigurationProperties("spring.datasource")
public class DBConfiguration {
    @Profile("dev")
    @PostConstruct
    public void devDatabaseConnection() {
        System.out.println("Current Profile: Dev");
    }

    @Profile("prod")
    @PostConstruct
    public void prodDatabaseConnection() {
        System.out.println("Current Profile: Prod");
    }

}

