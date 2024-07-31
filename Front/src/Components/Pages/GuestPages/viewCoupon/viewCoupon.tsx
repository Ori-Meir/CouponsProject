import { useNavigate, useParams } from "react-router-dom";
import "./viewCoupon.css";
import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { getSingleCouponAction } from "../../../../redux/CouponReducer";
import notify from "../../../../util/notify";
import { Typography } from "@mui/material";
import { checkData } from "../../../../util/chekData";

export function ViewCoupon(): JSX.Element {
    const params = useParams();
    const navigate = useNavigate();

    const [coupons, setCuopons] = useState<Coupon>();

    useEffect(() => {
        checkData();
        axiosJWT.get(`http://localhost:8080/getSingleCoupon/${params.id}`)
            .then(res => {
                setCuopons(res.data);
                myStore.dispatch(getSingleCouponAction(res.data));
            })
            .catch((err) => {
                notify.error("Error to get this coupon ");
            })
    }, [])



    return (
        <div className="viewCoupon">
            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '20px', borderBottom: '2px solid #3f51b5', paddingBottom: '5px' }}>
                Coupon Details
            </Typography>
            <div className="couponDetails">
                <div className="couponDetail">
                    <Typography variant="subtitle1" component="p">
                        <strong>ID:</strong> {coupons?.id}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>Name:</strong> {coupons?.title}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>Company:</strong> {coupons?.companyId}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>Category:</strong> {coupons?.categoryId}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>Start Date:</strong> {coupons?.startDate}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>End Date:</strong> {coupons?.endDate}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>Amount:</strong> {coupons?.amount}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <strong>Price:</strong> {coupons?.price}
                    </Typography>
                </div>
                {myStore.getState().auth.userType === "COMPANY" && (
                    <div className="actionButton" style={{ backgroundColor: '#3f51b5', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => navigate(`/updateCoupon/${coupons?.id}`)}>
                        Update Coupon
                    </div>
                )}
                {myStore.getState().auth.userType === "CUSTOMER" && (
                    <div className="actionButton Box" style={{ backgroundColor: '#3f51b5', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }} onClick={() => navigate(`/purchaseCoupon/${coupons?.id}`)}>
                        Purchase Coupon
                    </div>
                )}
            </div>
        </div>
    );
}    