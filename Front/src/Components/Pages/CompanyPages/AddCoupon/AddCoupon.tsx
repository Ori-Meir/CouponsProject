import { Button, ButtonGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { myStore } from "../../../../redux/Store";
import notify from "../../../../util/notify";
import { useNavigate } from "react-router-dom";
import { addCouponAction } from "../../../../redux/CompanyReducer";
import { Coupon } from "../../../Models/Coupon";
import { useEffect, useState } from "react";
import { checkData } from "../../../../util/chekData";
import axiosJWT from "../../../../util/axiosJWT";
import { Category } from "../../../Models/Category";
import { addCouponForGuestAction } from "../../../../redux/CouponReducer";

export function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const companyId = myStore.getState().auth.id;
    // const [company, setCompany] = useState<Company | null>(null);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Coupon>({
        defaultValues: {
            categoryId: Category.electricity
        }
    });

    const authId = myStore.getState().company.companyDetails.id;

    useEffect(() => {
        checkData();
        if (myStore.getState().auth.userType !== "COMPANY") {
            navigate("/Page404");
            notify.error("No Access!");

        }
        if (myStore.getState().auth.token.length < 10) {
            navigate("/Login");
        }
    }, [navigate]);

    const onSubmit: SubmitHandler<Coupon> = (data) => {
        data.companyId = myStore.getState().auth.id;
        const token = myStore.getState().auth.token;
        console.log("JWT Token:", token);

        axiosJWT.post("http://localhost:8080/addCoupon", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const newCouponId = +res.data;
                data.id = newCouponId;
                console.log("Coupon added successfully:", data);
                myStore.dispatch(addCouponAction(data));
                myStore.dispatch(addCouponForGuestAction(data));
                notify.success("Coupon added successfully!");
                navigate("/allCoupons")

            })
            .catch(err => {
                console.error("Failed to add coupon:", err.response ? err.response.data : err);
                notify.error("Failed to add the coupon. " + (err.response ? err.response.data.message : ""));
            });
    };

    return (
        <div className="AddCoupon">
            <div className="Box" style={{ width: "70%", height: "68vh", overflowY: "scroll" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <InputLabel id="category-select-label">Category Name</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="categoryId"
                        {...register("categoryId", { required: true })}
                        label="Category Name"
                        defaultValue={Category.electricity}
                        fullWidth
                    >
                        <MenuItem key={Category.electricity} value={Category.electricity}>Electricity</MenuItem>
                        <MenuItem key={Category.restaurant} value={Category.restaurant}>Restaurant</MenuItem>
                        <MenuItem key={Category.food} value={Category.food}>Food</MenuItem>
                        <MenuItem key={Category.vacation} value={Category.vacation}>Vacation</MenuItem>
                    </Select>
                    {errors.categoryId?.type === "required" && (
                        <><br /><span style={{ color: "red" }}>This field is required!!</span></>
                    )}
                    <br /><br />
                    <TextField
                        label="Title"
                        variant="outlined"
                        {...register("title", { required: true, minLength: 3 })}
                        fullWidth
                    />
                    {errors.title?.type === "required" && (
                        <><br /><span style={{ color: "red" }}>This field is required!!</span></>
                    )}
                    {errors.title?.type === "minLength" && (
                        <><br /><span style={{ color: "red" }}>Minimum 3 letters</span></>
                    )}
                    <br /><br />
                    <TextField
                        label="Description"
                        variant="outlined"
                        {...register("description")}
                        fullWidth
                    />
                    <br /><br />

                    <label id="startDate">Start Date</label>
                    <input type="date" id="startDate"{...register("startDate")} />

                    {errors.startDate?.type === "required" && (
                        <><br /><span style={{ color: "red" }}>This field is required!!</span></>
                    )}
                    <br /><br />

                    <label id="endDate">End Date</label>
                    <input type="date" id="endDate"{...register("endDate")} />

                    <br /><br />
                    <TextField
                        label="Amount"
                        variant="outlined"
                        {...register("amount", { required: true, min: 1 })}
                        fullWidth
                    />
                    {errors.amount?.type === "min" && (
                        <><br /><span style={{ color: "red" }}>Amount must be more than</span></>
                    )}
                    {errors.amount?.type === "required" && (
                        <><br /><span style={{ color: "red" }}>This field is required!!!</span></>
                    )}
                    <br /><br />
                    <TextField
                        label="Price"
                        variant="outlined"
                        {...register("price", { required: true, min: 1 })}
                        fullWidth
                    />
                    {errors.price?.type === "min" && (
                        <><br /><span style={{ color: "red" }}>Price must be more than</span></>
                    )}
                    {errors.price?.type === "required" && (
                        <><br /><span style={{ color: "red" }}>This field is required!!!</span></>
                    )}
                    <br /><br />
                    <TextField
                        label="Image"
                        variant="outlined"
                        {...register("image")}
                        fullWidth
                    />
                    <hr />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="success">Add Coupon</Button>
                        <Button color="error" onClick={() => navigate("/allCoupons")}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div >
    );
}
