package com.Coupons_Project.Controller;

import com.Coupons_Project.services.CustomerService;
import com.Coupons_Project.Utils.JWT;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {
    private final JWT jwtUtil;
    private final CustomerService customerService;

    @PostMapping("/purchaseCoupon/{customerId}/{couponId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> purchaseCoupon(@RequestHeader("Authorization") String jwt, @PathVariable int customerId, @PathVariable int couponId) throws Exception {
        return new ResponseEntity<>(customerService.purchaseCoupon(customerId, couponId), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);

    }

    @GetMapping("/allCustomerCoupons/{id}")
    public ResponseEntity<?> getAllCustomerCoupons(@RequestHeader("Authorization") String jwt, @PathVariable int id) throws Exception {
        return new ResponseEntity<>(customerService.getAllCustomerCoupons(id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }

    @GetMapping("/customerCouponsByCategory/{category}/{id}")
    public ResponseEntity<?> getAllCustomerCouponsByCategory(@RequestHeader("Authorization") String jwt, @PathVariable String category, @PathVariable int id) throws Exception {
        return new ResponseEntity<>(customerService.getAllCustomerCouponsByCategory(category, id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }

    @GetMapping("/customerCouponsByPrice/{maxPrice}/{id}")
    public ResponseEntity<?> getAllCustomerCouponsUpToMaxPrice(@RequestHeader("Authorization") String jwt, @PathVariable Double maxPrice, @PathVariable int id) throws Exception {
        return new ResponseEntity<>(customerService.getAllCustomerCouponsUpToMaxPrice(maxPrice, id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }

    @GetMapping("/customerDetails/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getCustomerDetails(@RequestHeader("Authorization") String jwt, @PathVariable int id) throws Exception {
        return new ResponseEntity<>(customerService.getCustomerDetails(id), jwtUtil.CheckTheJWT(jwt), HttpStatus.OK);
    }
}