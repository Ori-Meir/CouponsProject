import { useEffect, useState } from "react";
import "./DeleteCustomer.css";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../../../util/notify";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import { deleteCustomerAction } from "../../../../redux/AdminReducer";
import { checkData } from "../../../../util/chekData";

export function DeleteCustomer(): JSX.Element {
    const [customerId, setCudtomerId] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        if(myStore.getState().auth.userType !== "ADMIN"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
    },[])

    const handleDelete = () => {
        checkData();
        axiosJWT.delete(`http://localhost:8080/deleteCustomer/${customerId}`)
            .then((data) => {
                myStore.dispatch(deleteCustomerAction(parseInt(customerId)))
                notify.success("Customer deleted sucessfuly!")
                navigate("/allCustomers");
            })
            .catch(error => {
                notify.error("error to delete this customer")

            });
    };

    return (
        <div className="delete-customer Box">
            <Typography variant="h4" className="HeadLine">Delete Customer</Typography> <br />
            <TextField label="Customer Id to delete" variant="outlined" value={customerId} onChange={(e) => setCudtomerId(e.target.value)} /> <br />
            <br />
            <hr />
            <ButtonGroup  variant="contained" fullWidth>
                <Button type="submit" color="success" value="Delete Customer" onClick={handleDelete}>Delete Customer</Button>
                <Button type="button" color="error" value="Cancel" onClick={() => navigate("/allCustomer")} >Canecl</Button>
            </ButtonGroup>
        </div>
    );
}