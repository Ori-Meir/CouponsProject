package com.Coupons_Project.beans;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@Entity
@Table(name = "CUSTOMERS")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 15)
    @Length(min = 1, max = 15)
    private String FirstName;

    @Column(nullable = false, length = 15)
    @Length(min = 1, max = 38)
    private String LastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false, length = 13)
    @Length(min = 4, max = 20)
    private String password;

    @Singular
    @ManyToMany(targetEntity = Coupon.class)
    @PrimaryKeyJoinColumn(name = "coupons_id")
    @JoinTable(name = "customers_coupons")
    private List<Coupon> coupons;

}
