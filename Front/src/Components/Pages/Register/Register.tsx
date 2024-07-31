import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { myStore } from "../../../redux/Store";
import { addCustomerAction } from "../../../redux/AdminReducer";
import notify from "../../../util/notify";
import { Customer } from "../../Models/Customer";

export function Register(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Customer>();

    const onSubmit: SubmitHandler<Customer> = (data) => {

        axios.post("http://localhost:8080/register", data)
            .then(res => {
                myStore.dispatch(addCustomerAction(data));
                notify.success("Registration successful!");
                navigate("/customerAdded");
            })
            .catch(err => {
                console.error("Failed to register customer:", err);
                notify.error("Failed to register customer. Please try again.");
            });
    };

    return (
        <div className="Register">
            <div className="Box" style={{ width: "30%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" className="HeadLine">Register</Typography>
                    <hr />
                    <TextField label="First Name" variant="outlined" {...register("firstName", { required: true, minLength: 2 })} />
                    {errors.firstName?.type === "required" && <><br /><span style={{ color: "red" }}>First Name is needed</span></>}
                    {errors.firstName?.type === "minLength" && <><br /><span style={{ color: "red" }}>Minimum 2 letters</span></>}
                    <br /><br />
                    <TextField label="Last Name" variant="outlined" {...register("lastName", { required: true, minLength: 2 })} />
                    {errors.lastName?.type === "required" && <><br /><span style={{ color: "red" }}>Last Name is needed</span></>}
                    {errors.lastName?.type === "minLength" && <><br /><span style={{ color: "red" }}>Minimum 2 letters</span></>}
                    <br /><br />
                    <TextField label="Email" variant="outlined" {...register("email", { required: true })} />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}>This field is required!!</span></>}
                    <br /><br />
                    <TextField label="Enter password" type="password" variant="outlined" {...register("password", { required: true, minLength: 4 })} />
                    {errors.password?.type === "required" && <><br /><span style={{ color: "red" }}>This field is required!!</span></>}
                    {errors.password?.type === "minLength" && <><br /><span style={{ color: "red" }}>Minimum 4 characters</span></>}
                    <br /><br />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" color="success">Register</Button>
                        <Button value="Cancel" color="error" onClick={() => { navigate("/allCustomers") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
