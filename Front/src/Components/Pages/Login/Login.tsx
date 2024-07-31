import { Button, ButtonGroup, Checkbox, MenuItem, Select, TextField, Typography } from "@mui/material";
import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import notify from "../../../util/notify";

import { authState, loginAction } from "../../../redux/authReducer";
import { jwtDecode } from "jwt-decode";
import axiosJWT from "../../../util/axiosJWT";
import { myStore } from "../../../redux/Store";
import { UserType } from "../../Models/UserType";
import { useState } from "react";
import { Category } from "@mui/icons-material";

type userLoginData = {
    userEmail: string;
    userPass: string;
    userType: string;

}

type jwtData = { 
        "id":number,
        "userType": string,
        "userName": string,
        "sub": string,
        "iat": number,
        "exp": number
}


export function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<userLoginData>();
    const [userType, setUserType] = useState("CUSTOMER");
    const makeLogin: SubmitHandler<userLoginData> = (data) => {
        console.log(data);
        let userDetails = {
            "email":data.userEmail,
            "password":data.userPass,
            userType: userType
                }
        console.log(userDetails)
        axiosJWT.post("http://localhost:8080/user/login",userDetails)
        .then (res=>{
            const JWT = res.headers["authorization"].split(" ")[1];
            const decoded_jwt = jwtDecode<jwtData>(JWT);
            console.log(decoded_jwt);
            let myAuth = {
                id: decoded_jwt.id,
                name: decoded_jwt.userName,
                email: decoded_jwt.sub,
                token : res.headers["authorization"],
                userType: decoded_jwt.userType,
                isLogged:true    
            };
            myStore.dispatch(loginAction(myAuth))
            
            notify.success("Welcome back");
            navigate("/allCoupons");
        })
        .catch((err:AxiosError)=>{
            console.log(err.message);
            notify.error("bad user or password !!");
        });
    }

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(makeLogin)}>
                <Typography variant="h4" className="HeadLine">User Login</Typography><hr />
                <TextField label="user email" variant="outlined" {...register("userEmail")} /><br /><br />
                <TextField label="user password" variant="outlined" type="password" {...register("userPass")} /><br /><br/>
                <Select
                    label="User Type"
                    defaultValue="CUSTOMER"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                >
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="COMPANY">Company</MenuItem>
                    <MenuItem value="CUSTOMER">Customer</MenuItem>
                </Select>
                <hr />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="success" style={{ marginRight: 10 }}>Login</Button>
                    <Button color="error">Cancel</Button>
                </ButtonGroup>
            </form>
        </div>
    );
}