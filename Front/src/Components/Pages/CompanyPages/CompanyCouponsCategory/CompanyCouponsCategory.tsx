import { Button, ButtonGroup, Typography } from "@mui/material";
import "./CompanyCouponsCategory.css";
import { Category } from "../../../Models/Category";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { SingleCoupon } from "../../GuestPages/SingleCoupon/SingleCoupon";
import axios from "axios";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { getCompanyCouponsCategoryAction } from "../../../../redux/CompanyReducer";
import { getSingleComapnyAction } from "../../../../redux/AdminReducer";
import notify from "../../../../util/notify";

export function CompanyCouponsCategory(): JSX.Element {
    const navigate = useNavigate();
    myStore.subscribe(() => { setCoupons(myStore.getState().company.allCoupons) })
    const id = myStore.getState().auth.id;
    const [categories, setCategory] = useState<Category>();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value as Category);
    };

    useEffect(() => {
        if (myStore.getState().auth.userType !== "COMPANY") {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
    }, []);
    const getData = () => {
        axiosJWT.get<Coupon[]>(`http://localhost:8080/companyCouponsCategory/${categories}/${id}`)
            .then(response => {
                myStore.dispatch(getCompanyCouponsCategoryAction(response.data))
                setCoupons(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch company coupons by category:", error);
            });
    };


    return (
        <div className="CompanyCouponsCategory" style={{ height: "75vh", overflowY: "scroll" }}>
            <div className="Box">
                <Typography variant="h5">Coupons By Category</Typography>
                <select name="Category" value={categories} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value={Category.electricity}>Electricity</option>
                    <option value={Category.restaurant}>Restaurant</option>
                    <option value={Category.food}>Food</option>
                    <option value={Category.vacation}>Vacation</option>
                </select>
                <br /> <br />
                <hr />
                <ButtonGroup>
                    <Button onClick={getData} color="primary" variant="contained">Search</Button>
                    <Button onClick={() => navigate('/companyDetails')} color="secondary" variant="contained">Cancel</Button>
                </ButtonGroup>
            </div>
            <hr />
   
            <div className="CouponsList">
                {coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <SingleCoupon key={coupon.id} coupon={coupon} />
                    ))
                ) : (
                    <Typography variant="body1">No coupons found for the selected category.</Typography>
                )}
            </div>
        </div>
    );
}
