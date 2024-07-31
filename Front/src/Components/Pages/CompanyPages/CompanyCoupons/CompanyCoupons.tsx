import { useEffect, useState } from "react";
import "./CompanyCoupons.css";
import { Coupon } from "../../../Models/Coupon";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { checkData } from "../../../../util/chekData";
import { myStore } from "../../../../redux/Store";
import axiosJWT from "../../../../util/axiosJWT";
import { getAllCouponsAction } from "../../../../redux/CouponReducer";
import { getCompanyCouponsAction } from "../../../../redux/CompanyReducer";
import { Typography } from "@mui/material";
import { SingleCoupon } from "../../GuestPages/SingleCoupon/SingleCoupon";
import notify from "../../../../util/notify";

export function CompanyCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(myStore.getState().auth.userType !== "COMPANY"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
        let returnCoupons: Coupon[] = [];

        checkData();
        console.log("getting all coupons.....",myStore.getState().auth);
        if (myStore.getState().company.allCoupons.length <= 1) {
            const token = myStore.getState().auth.token;
            axiosJWT.get(`http://localhost:8080/allCompanyCoupons/${myStore.getState().auth.id}`)
            .then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    returnCoupons.push(new Coupon(
                        res.data[index].id, 
                        res.data[index].companyId,
                        res.data[index].category,
                        res.data[index].title,
                        res.data[index].decription,
                        res.data[index].startDate,
                        res.data[index].endDate,
                        res.data[index].amount,
                        res.data[index].price,
                        res.data[index].image
                    ));
                }
                console.log("we got coupons", returnCoupons);
                myStore.dispatch(getCompanyCouponsAction(returnCoupons));
                setCoupons(returnCoupons);
            })
            .catch((err:AxiosError) => {
                console.error("Failed to fetch company coupons:", err.message);
                navigate("/Login");
            });
        } else {
            console.log("from store:", myStore.getState().company.allCoupons);
            setCoupons(myStore.getState().company.allCoupons);
        }
    }, [params.id]);

    return (
        <div className="CompanyCoupons" >
            <Typography variant="h5">All Company Coupons</Typography>
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}
