package com.Coupons_Project.exceptions.CustomerExceptions;

public class CustomerSystemException extends Exception{
    public CustomerSystemException(CustomerErrMsg customerErrMsg){
        super(customerErrMsg.getMsg());
    }
}
