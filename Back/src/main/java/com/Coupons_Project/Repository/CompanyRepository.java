package com.Coupons_Project.Repository;

import com.Coupons_Project.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findByName(String name);

    Boolean existsByName(String name);

    Company findByEmail(String email);

    Company findByEmailAndPassword(String email, String password);


}
