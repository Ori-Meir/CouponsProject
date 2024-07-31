package com.Coupons_Project.Repository;

import com.Coupons_Project.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Integer> {
    Boolean existsByTitle(String title);

    @Query(value = "SELECT * FROM couponproject2.coupons where category_id = ? AND company_id = ?;", nativeQuery = true)
    List<Coupon> findBycategory_idAndcompany_id(String categoryId, Integer companyId);

    @Query(value = "SELECT * FROM coupons JOIN customers_coupons ON coupons.id = customers_coupons.coupons_id WHERE category_id= ? and customer_id = ?;", nativeQuery = true)
    List<Coupon> findBycategory_idAndCustomer_id(String categoryId, Integer customer_id);

    @Query(value = "SELECT * FROM coupons JOIN customers_coupons ON coupons.id = customers_coupons.coupons_id WHERE price<? and customer_id = ?;", nativeQuery = true)
    List<Coupon> priceAndId(Double price, Integer id);

    @Query(value = "SELECT * FROM couponproject2.coupons where company_id = ? and price<?;", nativeQuery = true)
    List<Coupon> companyByPrice(Integer id, Double price);

    @Query(value = "SELECT * FROM couponproject2.coupons where end_date<=now();", nativeQuery = true)
    void expiredCoupons();

}