import { useEffect, useState } from "react";
import "./CustomersCoupons.css";
import { useNavigate, useParams } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { checkData } from "../../../../util/chekData";
import { myStore } from "../../../../redux/Store";
import axiosJWT from "../../../../util/axiosJWT";
import { getCustomerCouponsAction } from "../../../../redux/CustomerReducer";
import { AxiosError } from "axios";
import { Typography } from "@mui/material";
import { SingleCoupon } from "../../GuestPages/SingleCoupon/SingleCoupon";
import notify from "../../../../util/notify";

export function CustomersCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(myStore.getState().auth.userType !== "CUSTOMER"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
        let returnCoupons: Coupon[] = [];

        checkData();
        console.log("getting all coupons.....",myStore.getState().auth);
        if (myStore.getState().customer.customerCoupons.length <=1) {
            const token = myStore.getState().auth.token;
            axiosJWT.get(`http://localhost:8080/allCustomerCoupons/${myStore.getState().auth.id}`)
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
                myStore.dispatch(getCustomerCouponsAction(returnCoupons));
                setCoupons(returnCoupons);
            })
            .catch((err:AxiosError) => {
                console.error("Failed to fetch company coupons:", err.message);
                navigate("/Login");
            });
        } else {
            console.log("from store:", myStore.getState().customer.customerCoupons);
            setCoupons(myStore.getState().customer.customerCoupons);
        }
    }, [params.id]);

    return (
        <div className="CustomersCoupons">
			<Typography>All Customer Coupons</Typography>
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item}/>)}
        </div>
    );
}
