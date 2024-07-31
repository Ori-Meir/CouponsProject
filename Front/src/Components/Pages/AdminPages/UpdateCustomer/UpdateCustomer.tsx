import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { myStore } from "../../../../redux/Store";
import notify from "../../../../util/notify";
import axiosJWT from "../../../../util/axiosJWT";
import { updateCustomerAction } from "../../../../redux/AdminReducer";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { checkData } from "../../../../util/chekData";
import cloneDeep from 'lodash/cloneDeep';
import axios from "axios";

export function UpdateCustomer(): JSX.Element {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Customer>();

    useEffect(() => {
        checkData();
        if (myStore.getState().auth.userType !== "ADMIN") {
            navigate("/Page404");
            notify.error("No Access!");

        }
        if (id) {
            const singleCustomer = cloneDeep(myStore.getState().admin.allCustomers.find(item => item.id === +id));
            if (singleCustomer) {
                setCustomer(singleCustomer);
                reset(singleCustomer);
            }
        }
        if (myStore.getState().auth.token.length < 10) {
            navigate("/Login");
        }
    }, [id, reset, navigate]);

    const onSubmit: SubmitHandler<Customer> = (data) => {
        const token = myStore.getState().auth.token;
        axiosJWT.put("http://localhost:8080/updateCustomer", data, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                myStore.dispatch(updateCustomerAction(data));
                notify.success("Customer updated successfully!");
                navigate("/allCustomers");
            })
            .catch(err => {
                console.error("Failed to update customer:", err.response ? err.response.data : err);
                notify.error("Failed to update the customer. " + (err.response ? err.response.data.message : ""));
            });
    };

    return (
        <div className="updateCustomer">
            <div className="Box" style={{ width: "70%", height: "68vh", overflowY: "scroll" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" className="HeadLine">Update Customer</Typography> <br />
                    <TextField
                        label="First Name"
                        defaultValue={customer?.firstName}
                        {...register("firstName", { required: "First Name is required!!" })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        defaultValue={customer?.lastName}
                        {...register("lastName", { required: "Last Name is required!!" })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        defaultValue={customer?.email}
                        {...register("email")}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        defaultValue={customer?.password}
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <hr />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" variant="contained" color="primary">Update</Button>
                        <Button variant="contained" color="error" onClick={() => navigate("/allCustomers")}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
