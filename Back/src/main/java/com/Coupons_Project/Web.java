package com.Coupons_Project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Web {

    public static void main(String[] args) {
        SpringApplication.run(Web.class, args);


    }
}
