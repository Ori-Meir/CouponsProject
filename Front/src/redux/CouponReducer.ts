import { Coupon } from "../Components/Models/Coupon";

export class CouponState {
    public allCoupons: Coupon[] = [];
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
    };
}

export enum CouponActionType {
    getAllCoupons = "getCoupons",
    getSingleCoupon = "SingleCoupon",
    addCouponForGuest= "addCouponForGuest",
    deleteCouponForGuest = "deleteCouponForGuest"
}

export interface CouponAction {
    type: CouponActionType,
    payload?: any
}

export function getAllCouponsAction(coupons: Coupon[]): CouponAction {
    return { type: CouponActionType.getAllCoupons, payload: coupons };
}

export function getSingleCouponAction(coupon: Coupon): CouponAction {
    return { type: CouponActionType.getSingleCoupon, payload: coupon };
}
export function addCouponForGuestAction(coupon: Coupon): CouponAction {
    return { type: CouponActionType.addCouponForGuest, payload: coupon };
}
export function deleteCouponForGuestAction(id: number): CouponAction {
    return { type: CouponActionType.addCouponForGuest, payload: id };
}

export function CouponReducer(currentState: CouponState = new CouponState(), action: CouponAction): CouponState {
    const newState = { ...currentState };
    switch (action.type) {
        case CouponActionType.getAllCoupons:
            newState.allCoupons = action.payload;
            break;
        case CouponActionType.getSingleCoupon:
            newState.coupon = action.payload;
            break;
        case CouponActionType.addCouponForGuest:
            newState.allCoupons = [...newState.allCoupons, action.payload];
            break;
        case CouponActionType.deleteCouponForGuest:
            newState.allCoupons = newState.allCoupons.filter((item) => item.id !== action.payload);
    }
    return newState;
}
