package com.Coupons_Project.services;

import com.Coupons_Project.Repository.UserRepo;
import com.Coupons_Project.beans.*;
import com.Coupons_Project.exceptions.AdminExceptions.AdminErrMsg;
import com.Coupons_Project.exceptions.AdminExceptions.AdminSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final AdminServiceImp adminServiceImp;
    private final CompanyServiceImp companyServiceImp;
    private final CustomerServiceImp customerServiceImp;


    public boolean registerUser(UserDetails user) throws Exception {
        if (userRepo.existsById(user.getId())) {
            throw new Exception("UserExists");
        }
        adminServiceImp.addCustomer(Customer.builder()
                .FirstName(user.getName().split("_")[0])
                .LastName(user.getName().split("_")[1])
                .password(user.getPassword())
                .email(user.getEmail())
                .build());
        return true;
    }

    public UserDetails loginUser(Credentials credentials) throws Exception {

        switch (credentials.getUserType()) {

            case CUSTOMER:

                int customerId = customerServiceImp.customerLogin(credentials.getEmail(), credentials.getPassword());
                Customer customer = adminServiceImp.getSingleCustomer(customerId);
                return UserDetails.builder()
                        .name(customer.getFirstName() + '_' + customer.getLastName())
                        .email(customer.getEmail())
                        .userType(UserType.CUSTOMER)
                        .id(customerId)
                        .build();

            case ADMIN:

                if (!credentials.getEmail().equals("admin@admin.com") && !credentials.getPassword().equals("admin")) {
                    throw new AdminSystemException(AdminErrMsg.NOT_ADMIN);
                }
                return UserDetails.builder()
                        .name("admin_admin")
                        .email("admin@admin.com")
                        .userType(UserType.ADMIN)
                        .id(1)
                        .build();

            case COMPANY:

                int companyId = companyServiceImp.companyLogin(credentials.getEmail(), credentials.getPassword());
                Company company = adminServiceImp.getSingleCompany(companyId);
                return UserDetails.builder()
                        .name(company.getName())
                        .email(company.getEmail())
                        .userType(UserType.COMPANY)
                        .id(companyId)
                        .build();
        }
        return null;
    }

}

