package com.Coupons_Project.services;

import com.Coupons_Project.beans.Coupon;
import com.Coupons_Project.beans.Customer;
import com.Coupons_Project.exceptions.CouponExceptions.CouponSystemException;
import com.Coupons_Project.exceptions.CustomerExceptions.CustomerSystemException;

import java.util.List;

public interface CustomerService {
    int customerLogin(String email, String password) throws CustomerSystemException;
    boolean purchaseCoupon(int customerId, int couponId) throws CouponSystemException, CustomerSystemException;
    List<Coupon> getAllCustomerCoupons(int customerId) throws CustomerSystemException;
    List<Coupon> getAllCustomerCouponsByCategory(String category, int id) throws CustomerSystemException;
    List<Coupon> getAllCustomerCouponsUpToMaxPrice(Double maxPrice, int id) throws CustomerSystemException;
    Customer getCustomerDetails(int id) throws CustomerSystemException;
}