package com.Coupons_Project.exceptions.CouponExceptions;

import lombok.Getter;

@Getter
public enum CouponErrMsg {
    COUPON_NOT_FOUND("Coupon not found"),
    AMOUNT_ERROR("amount is lower than 0"),
    COUPON_IS_EXPIRED("coupon is expired");

    public String msg;
    CouponErrMsg(String msg){this.msg=msg;}
}
