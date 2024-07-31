package com.Coupons_Project.beans;

import lombok.Getter;


@Getter

public enum Category {
    ELECTRICITY("electricity"),
    FOOD("food"),
    RESTAURANT("restaurant"),
    VACATION("vacation");

    private final String name;
     Category(String name) {
        this.name = name;
    }


}
