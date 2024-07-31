import { Company } from "../Components/Models/Company";
import { Coupon } from "../Components/Models/Coupon";

export class CompanyState {
    public allCoupons: Coupon[] = [];
    public companyDetails: Company= {
        id: -1,
        name: "",
        email: "",
        password: "",
        coupons: undefined
    }
    public coupon: Coupon = {
        id: -1,
        companyId: -1,
        categoryId: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        amount: 0,
        price: 0,
        image: ""
    }
}

export enum CompanyActionType {
    addCoupon = "addCoupon",
    updateCoupon = "updateCoupon",
    deleteCoupon = "deleteCoupon",
    getCompanyCoupons = "getCompanyCoupons",
    getCompanyCouponsCategory = "getCompanyCouponsCategory",
    getCompanyCouponsMaxPrice = "getCompanyCouponsMaxPrice",
    companyDetails = "companyDetails",
}

export interface CompanyAction {
    type: CompanyActionType,
    payload?: any
}

export function addCouponAction(newCoupon: Coupon): CompanyAction {
    return { type: CompanyActionType.addCoupon, payload: newCoupon };
}

export function updateCouponAction(coupon: Coupon): CompanyAction {
    return { type: CompanyActionType.updateCoupon, payload: coupon };
}

export function deleteCouponAction(id: number): CompanyAction {
    return { type: CompanyActionType.deleteCoupon, payload: id };
}

export function getCompanyCouponsAction(coupons: Coupon[]): CompanyAction {
    return { type: CompanyActionType.getCompanyCoupons, payload: coupons };
}

export function getCompanyCouponsCategoryAction(coupons: Coupon[]): CompanyAction {
    return { type: CompanyActionType.getCompanyCouponsCategory, payload: coupons }
}

export function getCompanyCouponsMaxPriceAction(coupons: Coupon[]): CompanyAction {
    return { type: CompanyActionType.getCompanyCouponsMaxPrice, payload: coupons }
}

export function companyDetailsAction(company: Company): CompanyAction {
    return { type: CompanyActionType.companyDetails, payload: company }
}

export function CompanyReducer(currentState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState { // שינוי סוג ההחזרה ל-CompanyState
    let newState = { ...currentState };
    switch (action.type) {
        case CompanyActionType.addCoupon:
            newState.allCoupons = [...newState.allCoupons, action.payload];
            break;
        case CompanyActionType.updateCoupon:
            newState.allCoupons = newState.allCoupons.map((coupon) =>
                coupon.id === action.payload.id ? { ...coupon, ...action.payload } : coupon
            );
            break;
        case CompanyActionType.deleteCoupon:
            newState.allCoupons = newState.allCoupons.filter((item) => item.id !== action.payload);
            break;
        case CompanyActionType.getCompanyCoupons:
            newState.allCoupons = action.payload;
            break;
        case CompanyActionType.getCompanyCouponsCategory:
            newState.allCoupons = currentState.allCoupons.filter((coupon) => coupon.categoryId === action.payload);
            break;
        case CompanyActionType.getCompanyCouponsMaxPrice:
            newState.allCoupons = currentState.allCoupons.filter((coupon) => coupon.price <= action.payload);
            break;
        case CompanyActionType.companyDetails:
            newState.companyDetails = action.payload; // עדכון פרטי החברה עם הערך שנמצא ב-action.payload
            break;
        default:
            return currentState;
    }
    return newState;
}
