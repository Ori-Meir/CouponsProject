package com.Coupons_Project.Repository;

import com.Coupons_Project.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Boolean existsByEmail(String email);
    Customer findByEmailAndPassword(String email, String password);


}
