import { Coupon } from "../Components/Models/Coupon";
import { Customer } from "../Components/Models/Customer";

export class CustomerState {
    public customerCoupons: Coupon[] = [];
    public customer: Customer = {
        id: -1,
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
    public coupon: Coupon = {
        id: -1,
        companyId: -1,
        categoryId: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        amount: -1,
        price: -1,
        image: ""
    }
}
export enum CustomerActionType {
    purchaseCoupon = "purchaseCoupon",
    getCustomerCoupons = "getCustomerCoupon",
    getCustomerCouponCategory = "getCustomerCouponsCategory",
    getCustomercouponsPrice = "getCustomerCouponsPrice",
    getCustomerDetails = "getCustomerDetails",
    //clearCustomerReducer = "clearCustomerReducer",
}

export interface CustomerAction {
    type: CustomerActionType,
    payload?: any
}

export function purchaseCouponAction(coupon: Coupon): CustomerAction {
    return { type: CustomerActionType.purchaseCoupon, payload: coupon };
}

export function getCustomerCouponsAction(coupons: Coupon[]): CustomerAction {
    return { type: CustomerActionType.getCustomerCoupons, payload: coupons };
}

export function getCustomerCouponCategoryAction(coupons: Coupon[]): CustomerAction {
    return { type: CustomerActionType.getCustomerCouponCategory, payload: coupons };
}

export function getCustomercouponsPrice(coupons: Coupon[]): CustomerAction {
    return { type: CustomerActionType.getCustomercouponsPrice, payload: coupons };
}

export function getCustomerDetailsAction(customer: Customer): CustomerAction {
    return { type: CustomerActionType.getCustomerDetails, payload: customer };
}

export function CustomerReducer(currentState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {
    let newState = { ...currentState };
    switch (action.type) {
        case CustomerActionType.purchaseCoupon:
            newState.customerCoupons = [...newState.customerCoupons, action.payload];
            break;
        case CustomerActionType.getCustomerCoupons:
            newState.customerCoupons = action.payload;
            break;
        case CustomerActionType.getCustomerCouponCategory:
            newState.customerCoupons = currentState.customerCoupons.filter((coupon) => coupon.categoryId === action.payload);
            break;
        case CustomerActionType.getCustomercouponsPrice:
            newState.customerCoupons = currentState.customerCoupons.filter((coupon) => coupon.price <= action.payload);
            break;
        case CustomerActionType.getCustomerDetails:
            newState.customer = action.payload;
            break;
    }
    return newState;
}
