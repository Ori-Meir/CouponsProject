package com.Coupons_Project.Controller;

import com.Coupons_Project.services.AdminService;
import com.Coupons_Project.services.GuestService;
import com.Coupons_Project.beans.Coupon;
import com.Coupons_Project.beans.Customer;
import com.Coupons_Project.exceptions.CouponExceptions.CouponSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin
public class GuestController implements GuestService {
    private final GuestService guestService;
    private final AdminService adminService;

    @Override
    @GetMapping("/getSingleCoupon/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Coupon getSingleCoupon(@PathVariable Integer id) throws CouponSystemException {
        return guestService.getSingleCoupon(id);
    }

    @Override
    @GetMapping("/getAllCoupons")
    public List<Coupon> getAllCoupons() {
        return guestService.getAllCoupons();

    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCustomer(@RequestBody Customer customer) throws Exception {
        adminService.addCustomer(customer);

    }
}