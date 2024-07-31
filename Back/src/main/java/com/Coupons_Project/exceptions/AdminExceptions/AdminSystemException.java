package com.Coupons_Project.exceptions.AdminExceptions;

public class AdminSystemException extends Exception{
    public AdminSystemException(AdminErrMsg adminErrMsg){
        super(adminErrMsg.getMsg());
    }
}
