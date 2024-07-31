import { useNavigate } from "react-router-dom";
import "./CustomersCouponsMaxPrice.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { SingleCoupon } from "../../GuestPages/SingleCoupon/SingleCoupon";
import { checkData } from "../../../../util/chekData";
import notify from "../../../../util/notify";

export function CustomersCouponsMaxPrice(): JSX.Element {
    const navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [error, setError] = useState<string>("");
    const id = myStore.getState().auth.id;
    useEffect(() => {
        if (myStore.getState().auth.userType !== "CUSTOMER") {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
    }, []);

    const getData = () => {
        checkData();
        axiosJWT.get<Coupon[]>(`http://localhost:8080/customerCouponsByPrice/${price}/${id}`)
            .then(response => {
                setCoupons(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch customer coupons by price:", error);
                setError(error.message);
                navigate("/Login");
            });
    };

    useEffect(() => {
        if (error) {
            console.error("API Error:", error);
        }
    }, [error]);

    return (
        <div className="CustomerCouponsMaxPrice" style={{ width: "100%", height: "80vh", overflowY: "scroll" }}>
            <div className="Box">
                <TextField label="Enter Max Price" variant="outlined" onChange={(e) => setPrice(+e.target.value)} /> <br />
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" onClick={getData} color="success">Search</Button>
                    <Button color="error" onClick={() => navigate("/customerDetails")}>Cancel</Button>
                </ButtonGroup>
            </div>
            <hr />
            <div className="CouponsList">
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <SingleCoupon key={coupon.id} coupon={coupon} />
                    ))
                ) : (
                    <Typography variant="body1">No coupons found below the requested price</Typography>
                )}
            </div>
        </div>
    );
}
