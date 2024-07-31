package com.Coupons_Project.Repository;

import com.Coupons_Project.beans.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserDetails, Integer> {
    UserDetails findByEmailAndPassword(String email, String password);
}