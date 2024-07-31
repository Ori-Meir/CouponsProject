import { useNavigate, useParams } from "react-router-dom";
import "./ViewCustomer.css";
import { Customer } from "../../../Models/Customer";
import { useEffect, useState } from "react";
import { checkData } from "../../../../util/chekData";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { getSingleCustomerAction } from "../../../../redux/AdminReducer";
import notify from "../../../../util/notify";
import { Typography } from "@mui/material";

export function ViewCustomer(): JSX.Element {
    const params = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>();

    useEffect(()=>{
        if(myStore.getState().auth.userType !== "ADMIN"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        } else{
        checkData();
        axiosJWT.get(`http://localhost:8080/singleCustomer/${params.id}`)
        .then(res=>{
            setCustomer(res.data);
            myStore.dispatch(getSingleCustomerAction(res.data));
        })
        .catch((err)=>{
            notify.error("Cannot get single customer");
        })
    }
    },[])

    return (
        <div className="ViewCompany Box">
            <Typography variant="h5">Customer details</Typography>
            id: {customer?.id} <br />
            Email: {customer?.email}<br/>
			Passrod: {customer?.password} 
        
            
            
        </div>
    );
}
