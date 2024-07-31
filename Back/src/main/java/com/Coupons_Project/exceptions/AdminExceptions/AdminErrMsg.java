package com.Coupons_Project.exceptions.AdminExceptions;

import lombok.Getter;

@Getter
public enum AdminErrMsg {
    ADMIN_NOT_EXISTS("Admin does not exist"),
    COMPANY_NAME_ALREADY_EXISTS("Cannot add the same company name"),
    EMAIL_ALREADY_EXISTS("email already exists "),
    ID_NOT_FOUND("ID not found"),
    COMPANY_NAME_ERROR("cannot change company's name"),

    NOT_ADMIN("Not an Admin");

    private String msg;

    AdminErrMsg(String msg) {
        this.msg = msg;
    }


}
