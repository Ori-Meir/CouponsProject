package com.Coupons_Project.services;

import com.Coupons_Project.Repository.CouponRepository;
import com.Coupons_Project.beans.Coupon;
import com.Coupons_Project.exceptions.CouponExceptions.CouponErrMsg;
import com.Coupons_Project.exceptions.CouponExceptions.CouponSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestServiceImp implements GuestService {

    final CouponRepository couponRepository;

    @Override
    public Coupon getSingleCoupon(Integer couponId) throws CouponSystemException {
        Coupon coupon = couponRepository.findById(couponId).orElse(null);
        if (coupon == null) {
            throw new CouponSystemException(CouponErrMsg.COUPON_NOT_FOUND);
        }
        return coupon;
    }

    @Override
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }
}
