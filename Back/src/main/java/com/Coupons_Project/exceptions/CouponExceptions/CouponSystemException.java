package com.Coupons_Project.exceptions.CouponExceptions;

public class CouponSystemException extends Exception{
    public CouponSystemException(CouponErrMsg couponErr){
        super(couponErr.getMsg());
    }
}
