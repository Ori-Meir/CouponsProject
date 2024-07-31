package com.Coupons_Project.services;

import com.Coupons_Project.beans.Coupon;
import com.Coupons_Project.exceptions.CouponExceptions.CouponSystemException;

import java.util.List;

public interface GuestService {
    Coupon getSingleCoupon(Integer couponId) throws CouponSystemException;

    List<Coupon> getAllCoupons();

}

