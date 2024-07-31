import { useNavigate } from "react-router-dom";
import "./CustomersCouponsCategory.css";
import { useEffect, useState } from "react";
import { Category } from "../../../Models/Category";
import { Coupon } from "../../../Models/Coupon";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { getCustomerCouponCategoryAction } from "../../../../redux/CustomerReducer";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { SingleCoupon } from "../../GuestPages/SingleCoupon/SingleCoupon";
import notify from "../../../../util/notify";

export function CustomersCouponsCategory(): JSX.Element {
    const navigate = useNavigate();
    const id = myStore.getState().auth.id;
    const [categories, setCategory] = useState<Category>();
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        if (myStore.getState().auth.userType !== "CUSTOMER") {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value as Category);
    };

    const getData = () => {
        axiosJWT.get<Coupon[]>(`http://localhost:8080/customerCouponsByCategory/${categories}/${id}`)
            .then(response => {

                myStore.dispatch(getCustomerCouponCategoryAction(response.data))
                setCoupons(response.data);
            })
            .catch(error => {
                console.error("Failed to fetch customer coupons by category:", error);
                navigate("/Login");
            });
    };

    return (
        <div className="CustomersCouponsCategory">
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
                    <Button onClick={() => navigate('/customerDetails')} color="secondary" variant="contained">Cancel</Button>
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
