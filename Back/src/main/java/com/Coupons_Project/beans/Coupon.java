package com.Coupons_Project.beans;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.sql.Date;

@Entity
@Table(name = "coupons")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private Integer companyId;

    @Enumerated(EnumType.STRING)
    private Category categoryId;

    @Column(nullable = false)
    @Length(min = 1, max = 400)
    private String title;

    @Column(nullable = false, unique = true, length = 40)
    @Length(min = 3, max = 40)
    private String description;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Date endDate;

    @Min(1)
    private Integer amount;

    @Min(1)
    private Double price;

    private String image;


    public Coupon(Integer companyId, Category categoryId, String title, String description,
                  Date startDate, Date endDate, Integer amount, Double price, String image) {
        this.companyId = companyId;
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }
}
