package com.Coupons_Project.exceptions.CustomerExceptions;

import lombok.Getter;

@Getter
public enum CustomerErrMsg {
    ID_NOT_FOUND("Id not found"),
    CUSTOMER_NOT_EXISTS("Customer not exists..."),
    CUSTOMER_LOGIN_ERROR("cannot login customer..."),
    MAX_PRICE_ERROR("price must be more than 0"),
    COUPON_ALREADY_PURCHASED("coupon already purchased");

    private String msg;

    CustomerErrMsg(String msg) {
        this.msg = msg;
    }

}
