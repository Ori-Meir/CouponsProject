import { useNavigate } from "react-router-dom";
import "./AddCompany.css";
import { Company } from "../../../Models/Company";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { myStore } from "../../../../redux/Store";
import { addCompanyAction } from "../../../../redux/AdminReducer";
import axiosJWT from "../../../../util/axiosJWT";
import notify from "../../../../util/notify";
import { useEffect, useState } from "react";
import { checkData } from "../../../../util/chekData";

export function AddCompany(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Company>({});
    const [companyData, setData] = useState<Company>();
    
    useEffect(() => {
        checkData();
        if (myStore.getState().auth.token.length < 10) {
            navigate("/Login");
        }
        if(myStore.getState().auth.userType !== "ADMIN"){
            navigate("/Page404");
            notify.error("No Accses");

        }
    })

    const onSubmit: SubmitHandler<Company> = (data) => {

        console.log(data);
        data.id = 0;
        const token = myStore.getState().auth.token;
        console.log("JWT Token:", token);
        axiosJWT.post("http://localhost:8080/addCompany", data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            console.log("company id:",res.data);
            data.id=+res.data;
            myStore.dispatch(addCompanyAction(data));
            notify.success("Company added!!!");
            navigate("/companyAdded");
        })
        .catch(err => {
            console.error("Failed to add company:", err.response ? err.response.data : err);
            if (err.response && err.response.data && err.response.data.key === 'Error') {
                notify.error(err.response.data.value);
            } else {
                notify.error("Failed to add the company. " + (err.response ? err.response.data.message : ""));
            }
        });
    };
    return (
        <div className="AddCompany">
            <div className="Box" style={{ width: "30%" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" className="HeadLine">Add Company</Typography>
                    <hr />
                    <TextField label="company email" variant="outlined" {...register("email", { required: true })} fullWidth />
                    {errors.email?.type === "required" && <><br /><span style={{ color: "red" }}> Email is needed</span></>}
                    <br /> <br />
                    <TextField label="Company Name" variant="outlined" {...register("name", { required: true, minLength: 3 })} fullWidth />
                    {errors.name?.type === "required" && <><br /><span style={{ color: "red" }}>Name is needed</span></>}
                    {errors.name?.type === "minLength" && <><br /><span style={{ color: "red" }}>Minimum 3 letters</span></>}
                    <br /><br />
                    <TextField label="Enter password" type="password" variant="outlined" {...register("password", { required: true, minLength: 4 })} fullWidth />
                    {errors.password?.type === "required" && <><br /><span style={{ color: "red" }}>This field is required!!</span></>}
                    {errors.password?.type === "minLength" && <><br /><span style={{ color: "red" }}>Minimum 4 characters</span></>}
                    <br /><br /><hr />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button color="success" type="submit" value="Add Company" >Add Company</Button>
                        <Button color="error" onClick={() => { navigate("/allCompanies") }}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
