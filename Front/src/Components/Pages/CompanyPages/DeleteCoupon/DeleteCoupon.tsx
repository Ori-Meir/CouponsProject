import { useEffect, useState } from "react";
import "./DeleteCoupon.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import notify from "../../../../util/notify";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { deleteCouponAction } from "../../../../redux/CompanyReducer";
import { deleteCouponForGuestAction } from "../../../../redux/CouponReducer";

export function DeleteCoupon(): JSX.Element {
    const [couponId, setCouponId] = useState('');
    const navigate = useNavigate();
  
    useEffect(()=>{
        if(myStore.getState().auth.userType !== "COMPANY"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
    },[])

    const handleDelete = () => {
        axiosJWT.delete(`http://localhost:8080/deleteCoupon/${couponId}`)
            .then((data) => {
                myStore.dispatch(deleteCouponForGuestAction(parseInt(couponId)));
                myStore.dispatch(deleteCouponAction(parseInt(couponId)));
                notify.success("Coupon is deleted successfully!");
                navigate("/allCoupons");
            })
            .catch(error => {
                notify.error("Error while deleting this coupon")

            });
    };

    return (
        <div className="delete-Coupon Box">
            <Typography variant="h4" className="HeadLine">Delete Coupon</Typography> <br /><br />
            <TextField label="Coupon ID to delete" variant="outlined" value={couponId} onChange={(e) => setCouponId(e.target.value)} /> <br />
            <br /> 
            <hr />
            <ButtonGroup variant="contained" fullWidth>
                <Button type ="submit" color="success" onClick={handleDelete} >Delete Coupon</Button>
                <Button type="button" color="error" onClick={() => navigate("/allCoupons")} >Cancel</Button>
            </ButtonGroup>
        </div>
    );
}