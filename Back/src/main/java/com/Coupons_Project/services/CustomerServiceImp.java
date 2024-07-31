package com.Coupons_Project.services;

import com.Coupons_Project.Repository.CouponRepository;
import com.Coupons_Project.Repository.CustomerRepository;
import com.Coupons_Project.beans.Coupon;
import com.Coupons_Project.beans.Customer;
import com.Coupons_Project.exceptions.CouponExceptions.CouponErrMsg;
import com.Coupons_Project.exceptions.CouponExceptions.CouponSystemException;
import com.Coupons_Project.exceptions.CustomerExceptions.CustomerErrMsg;
import com.Coupons_Project.exceptions.CustomerExceptions.CustomerSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImp implements CustomerService {
    private int customer_id;
    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;

    @Override
    public int customerLogin(String email, String password) throws CustomerSystemException {
        Customer customer = customerRepository.findByEmailAndPassword(email, password);
        if (customer == null) {
            throw new CustomerSystemException(CustomerErrMsg.CUSTOMER_LOGIN_ERROR);
        } else {
            this.customer_id = customer.getId();
        }
        return customer.getId();

    }


    @Override
    @Qualifier("Coupon")
    public boolean purchaseCoupon(int customerId, int couponId)
            throws CouponSystemException, CustomerSystemException {

        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new CouponSystemException(CouponErrMsg.COUPON_NOT_FOUND));

        Customer customer = customerRepository.findById(customerId).orElseThrow(() ->
                new CustomerSystemException(CustomerErrMsg.CUSTOMER_NOT_EXISTS));

        if (customer.getCoupons().contains(coupon)) {
            throw new CustomerSystemException(CustomerErrMsg.COUPON_ALREADY_PURCHASED);
        }
        if (coupon.getAmount() <= 0) {
            throw new CouponSystemException(CouponErrMsg.AMOUNT_ERROR);
        }
        if (coupon.getEndDate().before(Date.valueOf(LocalDate.now()))) {
            throw new CouponSystemException(CouponErrMsg.COUPON_IS_EXPIRED);
        }
        coupon.setAmount(coupon.getAmount() - 1);
        couponRepository.saveAndFlush(coupon);
        customer.getCoupons().add(coupon);
        customerRepository.saveAndFlush(customer);
        return true;
    }

    @Override
    public List<Coupon> getAllCustomerCoupons(int customerId) throws CustomerSystemException {
        return customerRepository.findById(customerId).orElseThrow(
                () -> new CustomerSystemException(CustomerErrMsg.ID_NOT_FOUND)).getCoupons();
    }

    @Override
    public List<Coupon> getAllCustomerCouponsByCategory(String category, int customerId) {
        return couponRepository.findBycategory_idAndCustomer_id(category, customerId);
    }

    @Override
    public List<Coupon> getAllCustomerCouponsUpToMaxPrice(Double maxPrice, int id) throws CustomerSystemException {
        if (maxPrice < 0) {
            throw new CustomerSystemException(CustomerErrMsg.MAX_PRICE_ERROR);
        }
        customerRepository.findById(this.customer_id);
        return couponRepository.priceAndId(maxPrice, id);
    }
    @Override
    public Customer getCustomerDetails(int id) throws CustomerSystemException {
        return customerRepository.findById(id)
                .orElseThrow(() -> new CustomerSystemException(CustomerErrMsg.CUSTOMER_NOT_EXISTS));
    }

}