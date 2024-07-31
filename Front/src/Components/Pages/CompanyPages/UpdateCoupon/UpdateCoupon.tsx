import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosJWT from '../../../../util/axiosJWT';
import notify from '../../../../util/notify';
import { myStore } from '../../../../redux/Store';
import { updateCouponAction } from '../../../../redux/CompanyReducer';
import { Coupon } from '../../../Models/Coupon';
import { Category } from '../../../Models/Category';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, ButtonGroup, InputLabel, Select, MenuItem } from '@mui/material';
import { checkData } from '../../../../util/chekData';

export function UpdateCoupon(): JSX.Element {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Coupon>();

    useEffect(() => {
        checkData();
        if (myStore.getState().auth.userType !== "COMPANY") {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
        if (id) {
            console.log({ ...myStore.getState().coupon.allCoupons.find(item => item.id === +id) })
            const singleCoupon = myStore.getState().coupon.allCoupons.find(item => item.id === +id);
            if (singleCoupon) {
                setCoupon({ ...singleCoupon });
                reset(singleCoupon);
            }
        }
        if (myStore.getState().auth.token.length < 10) {
            navigate("/Login");
        }
    }, [id, reset, navigate]);

    const onSubmit: SubmitHandler<Coupon> = (data) => {
        const token = myStore.getState().auth.token;
        axiosJWT.put("http://localhost:8080/updateCoupon", data,
            {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(res => {
                myStore.dispatch(updateCouponAction(data));
                notify.success("Coupon updated successfully!");
                navigate("/allCoupons");
            })
            .catch(err => {
                console.log("Error", err);
                console.error("Failed to update coupon:", err.response ? err.response.data : err);
                notify.error("Failed to update the coupon. " + (err.response ? err.response.data.message : ""));
            });
    };

    return (
        <div className="UpdateCoupon">
            <div className="Box" style={{ width: "70%", height: "68vh", overflowY: "scroll" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" className="HeadLine">Update Coupon</Typography> <br />
                    <TextField
                        label="Title"
                        defaultValue={coupon?.title}
                        {...register("title", { required: "Title is required" })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        defaultValue={coupon?.description}
                        {...register("description")}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        defaultValue={coupon?.startDate}
                        {...register("startDate", { required: "Start Date is required" })}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        defaultValue={coupon?.endDate}
                        {...register("endDate", { required: "End Date is required" })}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        defaultValue={coupon?.amount}
                        {...register("amount", { required: "Amount is required" })}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        type="number"
                        defaultValue={coupon?.price}
                        {...register("price", { required: "Price is required" })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        fullWidth
                        margin="normal"
                    />
                    <InputLabel id="category-label" >Select Category:</InputLabel>
                    <Select
                        labelId="category-label"
                        defaultValue={Category.electricity}
                        {...register("categoryId", { required: true })}
                        error={!!errors.categoryId}
                        fullWidth

                    >
                        <MenuItem value={Category.electricity}>Electricity</MenuItem>
                        <MenuItem value={Category.food}>Food</MenuItem>
                        <MenuItem value={Category.restaurant}>Restaurant</MenuItem>
                        <MenuItem value={Category.vacation}>Vacation</MenuItem>
                    </Select>
                    <TextField
                        label="Image"
                        defaultValue={coupon?.image}
                        {...register("image")}
                        fullWidth
                        margin="normal"
                    />
                    <hr />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" variant="contained" color="primary">Update</Button>
                        <Button variant="contained" color="error" onClick={() => navigate("/allCoupons")}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
