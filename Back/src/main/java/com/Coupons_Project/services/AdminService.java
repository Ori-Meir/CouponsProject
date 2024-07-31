package com.Coupons_Project.services;

import com.Coupons_Project.beans.Company;
import com.Coupons_Project.beans.Customer;
import com.Coupons_Project.exceptions.AdminExceptions.AdminSystemException;

import java.util.List;

public interface AdminService {

 boolean adminLogin(String email, String password) throws AdminSystemException;
 int addCompany(Company company) throws AdminSystemException;
 boolean updateCompany (Company company) throws AdminSystemException;
 boolean deleteCompany(int companyId) throws AdminSystemException;
 List<Company> getAllCompanies();
 Company getSingleCompany(int CompanyId) throws AdminSystemException;
 boolean addCustomer(Customer customer) throws AdminSystemException;
 boolean updateCustomer(Customer customer) throws AdminSystemException;
 boolean deleteCustomer(int customerId) throws AdminSystemException;
 List<Customer> getAllCustomers();
 Customer getSingleCustomer(int customerId) throws AdminSystemException;
}