import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosJWT from "../../../../util/axiosJWT";
import notify from "../../../../util/notify";
import { Coupon } from "../../../Models/Coupon";
import { Typography, Button, TextField } from "@mui/material";
import "./PurchaseCoupon.css";
import { myStore } from "../../../../redux/Store";
import { purchaseCouponAction } from "../../../../redux/CustomerReducer";

export function PurchaseCoupon(): JSX.Element {
    const { id } = useParams();
    const [coupon, setCoupon] = useState<Coupon>();
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(myStore.getState().auth.userType !== "CUSTOMER"){
            navigate("/Page404");
            notify.error("No Access");

        }
        axiosJWT.get(`http://localhost:8080/getSingleCoupon/${id}`)
            .then(res => {
                setCoupon(res.data);
                setLoading(false);
            })
            .catch(err => {
                notify.error("Unable to purchase this coupon ");
                console.log("err:", err)
                setLoading(false);
            });
    }, [id]);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosJWT.post(`http://localhost:8080/purchaseCoupon/${myStore.getState().auth.id}/${id}`)
        .then((res) => {
            console.log(res.data);
            if(res.data){
                myStore.dispatch(purchaseCouponAction(coupon as Coupon))
            notify.success(`Coupon ${coupon?.title} purchased successfully!`);
            }
            navigate("/allCoupons");

        })
        .catch(err => {
            console.log(err);
            notify.error("not working:"+ err);
        })
    };

    if (loading) {
        return <div className="PurchaseCoupon">Loading...</div>;
    }

    if (!coupon) {
        return <div className="PurchaseCoupon">Coupon not found</div>;
    }

    return (
        <div className="PurchaseCoupon Box" >

            <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
                Purchase Coupon
            </Typography>
            <form onSubmit={submitHandler}>
                <TextField
                    label="Id"
                    value={coupon.id}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />

                <TextField
                    label="Name"
                    value={coupon.title}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />
                <br /> <br />
                <TextField
                    label="Company"
                    value={coupon.companyId}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />
                <TextField
                    label="Category"
                    value={coupon.categoryId}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />
                <br /> <br />
                <TextField
                    label="Start Date"
                    value={coupon.startDate}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />
                <TextField
                    label="End Date"
                    value={coupon.endDate}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />
                <br /> <br />
                <TextField
                    label="Amount"
                    value={coupon.amount}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                />
                <TextField
                    label="Price"
                    value={coupon.price}
                    InputProps={{
                        readOnly: true,
                    }}

                    margin="normal"
                /><br /> <br />
                <Button variant="contained" color="primary" type="submit">
                    Purchase
                </Button>
            </form>
        </div>
    );
}
