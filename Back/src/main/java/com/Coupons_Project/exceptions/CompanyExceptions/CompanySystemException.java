package com.Coupons_Project.exceptions.CompanyExceptions;

public class CompanySystemException extends Exception{
    public CompanySystemException(CompanyErrMsg companyErrMsg){
        super(companyErrMsg.getMsg());
    }
}
