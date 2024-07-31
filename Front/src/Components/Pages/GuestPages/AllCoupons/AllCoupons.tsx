import { Typography } from "@mui/material";
import "./AllCoupons.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import { useNavigate } from "react-router-dom";
import { myStore } from "../../../../redux/Store";
import { getAllCouponsAction } from "../../../../redux/CouponReducer";
import { SingleCoupon } from "../SingleCoupon/SingleCoupon";
import axios from "axios";

export function AllCoupons(): JSX.Element {
    const navigate = useNavigate();
    const [coupons, setList] = useState<Coupon[]>([]);

    useEffect(() => {
        let recivedList: Coupon[] = [];
        if (myStore.getState().coupon.allCoupons.length <= 1) {
            axios.get("http://localhost:8080/getAllCoupons")
                .then(result => {
                    console.log("data:", result);
                    for (let index = 0; index < result.data.length; index++) {
                        recivedList.push(new Coupon(
                            result.data[index].id,
                            result.data[index].companyId,
                            result.data[index].categoryId,
                            result.data[index].title,
                            result.data[index].description,
                            result.data[index].startDate,
                            result.data[index].endDate,
                            result.data[index].amount,
                            result.data[index].price,
                            result.data[index].image
                        ));
                    }
                    myStore.dispatch(getAllCouponsAction(recivedList));
                    setList(myStore.getState().coupon.allCoupons);
                })
                .catch(err => {
                    navigate("/Login")
                });
        } else {
            setList(myStore.getState().coupon.allCoupons);
        }
    }, [myStore.getState().coupon.allCoupons])


    return (
        <div className="AllCoupons" style={{ width: "100%", height: "70vh", overflowY: "scroll" }}>
            <Typography variant="h4">Coupons</Typography>
            {coupons.map(item => <SingleCoupon key={item.id} coupon={item} />)}
        </div>
    );
}
