package com.Coupons_Project.services;

import com.Coupons_Project.Repository.CompanyRepository;
import com.Coupons_Project.Repository.CustomerRepository;
import com.Coupons_Project.beans.Company;
import com.Coupons_Project.beans.Customer;
import com.Coupons_Project.exceptions.AdminExceptions.AdminErrMsg;
import com.Coupons_Project.exceptions.AdminExceptions.AdminSystemException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImp implements AdminService {
    private final CompanyRepository companyRepository;
    private final CustomerRepository customerRepository;


    @Override
    public boolean adminLogin(String email, String password) throws AdminSystemException {
        final String adminEmail = "admin@admin.com";
        final String adminPass = "admin";
        if (email.equals(adminEmail) && password.equals(adminPass)) {
            return true;
        } else {
            throw new AdminSystemException(AdminErrMsg.ADMIN_NOT_EXISTS);
        }
    }

    @Override
    public int addCompany(Company company) throws AdminSystemException {
        String companyName = company.getName();
        if (companyRepository.findByName(companyName) != null) {
            throw new AdminSystemException(AdminErrMsg.COMPANY_NAME_ALREADY_EXISTS);
        }
        String email = company.getEmail();
        if (companyRepository.findByEmail(email) != null) {
            throw new AdminSystemException(AdminErrMsg.EMAIL_ALREADY_EXISTS);
        }
        var newCompany = companyRepository.save(company);
        System.out.println(newCompany.getId());
        return newCompany.getId();
    }

    @Override
    public boolean updateCompany(Company company) throws AdminSystemException {
        int id = company.getId();
        if (!companyRepository.existsById(id)) {
            throw new AdminSystemException(AdminErrMsg.ID_NOT_FOUND);
        }
        String name = company.getName();
        if (!companyRepository.existsByName(name)) {
            throw new AdminSystemException(AdminErrMsg.COMPANY_NAME_ERROR);
        }
        companyRepository.saveAndFlush(company);
        return true;
    }

    @Override
    public boolean deleteCompany(int companyId) throws AdminSystemException {
        if (!companyRepository.existsById(companyId)) {
            throw new AdminSystemException(AdminErrMsg.ID_NOT_FOUND);
        }
        Company company = getSingleCompany(companyId);
        company.setCoupons(null);
        companyRepository.deleteById(companyId);
        return true;
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company getSingleCompany(int CompanyId) throws AdminSystemException {
        return companyRepository.findById(CompanyId).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.ID_NOT_FOUND));
    }

    @Override
    public boolean addCustomer(Customer customer) throws AdminSystemException {
        String email = customer.getEmail();
        if (customerRepository.existsByEmail(email)) {
            throw new AdminSystemException(AdminErrMsg.EMAIL_ALREADY_EXISTS);
        }
        customerRepository.save(customer);
        return true;
    }

    @Override
    public boolean updateCustomer(Customer customer) throws AdminSystemException {
        if (!customerRepository.existsById(customer.getId())) {
            throw new AdminSystemException(AdminErrMsg.ID_NOT_FOUND);
        }
        customerRepository.saveAndFlush(customer);
        return true;
    }

    @Override
    public boolean deleteCustomer(int customerId) throws AdminSystemException {
        if (!customerRepository.existsById(customerId)) {
            throw new AdminSystemException(AdminErrMsg.ID_NOT_FOUND);
        }
        Customer customer = getSingleCustomer(customerId);
        customer.setCoupons(null);
        customerRepository.deleteById(customerId);
        return true;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer getSingleCustomer(int customerId) throws AdminSystemException {
        return customerRepository.findById(customerId).orElseThrow(() ->
                new AdminSystemException(AdminErrMsg.ID_NOT_FOUND));
    }

}
