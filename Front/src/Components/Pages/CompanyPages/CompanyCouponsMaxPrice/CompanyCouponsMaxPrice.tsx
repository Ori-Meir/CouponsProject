import { useNavigate } from "react-router-dom";
import "./CompanyCouponsMaxPrice.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { getCompanyCouponsMaxPriceAction } from "../../../../redux/CompanyReducer";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { SingleCoupon } from "../../GuestPages/SingleCoupon/SingleCoupon";
import notify from "../../../../util/notify";

export function CompanyCouponsMaxPrice(): JSX.Element {
    const navigate = useNavigate();
    const id = myStore.getState().auth.id;
    const [price, setPrice] = useState(0);
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        if (myStore.getState().auth.userType !== "COMPANY") {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
    }, []);
    const getData = () => {
        axiosJWT.get<Coupon[]>(`http://localhost:8080/companyCouponsMaxPrice/${id}/${price}`)
            .then(response => {
                setCoupons(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch company coupons by price:", error);
                navigate("/Login");
            });
    };



    return (
        <div className="CompanyCouponsMaxPrice" style={{ width: "100%", height: "80vh", overflowY: "scroll" }}>
            <div className="Box">
                <TextField label="Enter Max Price" variant="outlined" onChange={(e) => setPrice(+e.target.value)} /> <br />
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" onClick={getData} color="success">Search</Button>
                    <Button color="error" onClick={() => navigate("/companyDetails")}>Cancel</Button>
                </ButtonGroup>
            </div>
            <hr />
            <div className="CouponsList">
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <SingleCoupon key={coupon.id} coupon={coupon} />
                    ))
                ) : (
                    <Typography variant="body1">No coupons found for this price</Typography>
                )}
            </div>
        </div>
    );
}



