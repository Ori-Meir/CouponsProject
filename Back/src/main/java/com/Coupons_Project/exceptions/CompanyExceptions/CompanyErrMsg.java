package com.Coupons_Project.exceptions.CompanyExceptions;

import lombok.Getter;

@Getter
public enum CompanyErrMsg {
    COUPON_TITLE_ALREADY_EXISTS("Coupon title already exists"),
    ERROR("cannot change.."),
    CANNOT_CHANGE_COMPANY_ID("cannot change company id"),
    COUPON_ALREADY_EXISTS("coupon already exists"),
    COMPANY_NOT_EXISTS("company not exists..."),
    COMPANY_LOGIN_ERROR("cannot login ...."),
    TITLE_ALREADY_EXISTS("title already exists"),
    COMPANY_ALREADY_EXISTS("company already exists"),
    COUPON_NOT_FOUND("coupon not found"),
    ID_NOT_FOUND("id not found"),
    MAX_PRICE_ERROR("price must be more than 0");


    public String msg;


    CompanyErrMsg(String msg){this.msg=msg;}
    }



