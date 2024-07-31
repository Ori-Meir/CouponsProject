import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AdminReducer } from "./AdminReducer";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { AuthReducer } from "./authReducer";
import { CompanyReducer } from "./CompanyReducer";
import { CouponReducer } from "./CouponReducer";
import { CustomerReducer } from "./CustomerReducer";

const reducers = combineReducers({admin: AdminReducer,auth:AuthReducer, company: CompanyReducer, coupon: CouponReducer, customer: CustomerReducer});

export const myStore = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
