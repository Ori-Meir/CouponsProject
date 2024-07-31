package com.Coupons_Project.services;

import com.Coupons_Project.Repository.CompanyRepository;
import com.Coupons_Project.Repository.CouponRepository;
import com.Coupons_Project.beans.Company;
import com.Coupons_Project.beans.Coupon;
import com.Coupons_Project.exceptions.CompanyExceptions.CompanyErrMsg;
import com.Coupons_Project.exceptions.CompanyExceptions.CompanySystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImp implements CompanyService {

    private final CompanyRepository companyRepository;
    private final CouponRepository couponRepository;
    private int companyId;

    @Override
    public int companyLogin(String email, String password) throws CompanySystemException {
        Company company = companyRepository.findByEmailAndPassword(email, password);
        if (company == null) {
            throw new CompanySystemException(CompanyErrMsg.COMPANY_LOGIN_ERROR);
        }
        this.companyId = company.getId();
        return companyId;
    }

    @Override
    public int addCoupon(Coupon coupon) throws CompanySystemException {
        int id = coupon.getId();
        if (couponRepository.existsById(id)) {
            throw new CompanySystemException(CompanyErrMsg.COUPON_ALREADY_EXISTS);
        }
        String title = coupon.getTitle();
        if (couponRepository.existsByTitle(title)) {
            throw new CompanySystemException(CompanyErrMsg.COUPON_TITLE_ALREADY_EXISTS);
        }
        var newCoupon = couponRepository.save(coupon);
        System.out.println(newCoupon.getId());
        return newCoupon.getId();
    }

    @Override
    public boolean updateCoupon(Coupon coupon) throws CompanySystemException {
        int id = coupon.getId();
        Integer companyId = coupon.getCompanyId();
        if (!couponRepository.existsById(id)) {
            throw new CompanySystemException(CompanyErrMsg.COUPON_NOT_FOUND);
        }
        couponRepository.findById(companyId).orElseThrow(
                () -> new CompanySystemException(CompanyErrMsg.ID_NOT_FOUND)
        );
        couponRepository.saveAndFlush(coupon);
        return true;
    }

    @Override
    public boolean deleteCoupon(int id) throws CompanySystemException {
        couponRepository.deleteById(id);
        return true;
    }


    @Override
    public List<Coupon> getAllCompanyCoupons(int companyId) throws CompanySystemException {
        return companyRepository.findById(companyId).orElseThrow(
                () -> new CompanySystemException(CompanyErrMsg.ID_NOT_FOUND)).getCoupons();
    }

    @Override
    public List<Coupon> getAllCompanyCouponsByCategory(String category, int companyId) {
        return couponRepository.findBycategory_idAndcompany_id(category, companyId);

    }

    @Override
    public List<Coupon> getAllCompanyCouponsUpToMaxPrice(int id, Double maxPrice) throws CompanySystemException {
        if (maxPrice < 0) {
            throw new CompanySystemException(CompanyErrMsg.MAX_PRICE_ERROR);
        }
        companyRepository.findById(this.companyId);
        return couponRepository.companyByPrice(id, maxPrice);
    }


    @Override
    public Company getCompanyDetails(int companyId) throws CompanySystemException {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanySystemException(CompanyErrMsg.COMPANY_NOT_EXISTS));
    }

}