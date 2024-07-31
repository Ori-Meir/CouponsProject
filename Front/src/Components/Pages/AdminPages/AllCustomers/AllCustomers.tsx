import { useEffect, useState } from "react";

import "./AllCustomers.css";
import { Customer } from "../../../Models/Customer";
import { myStore } from "../../../../redux/Store";
import { getAllCustomersAction } from "../../../../redux/AdminReducer";
import axiosJWT from "../../../../util/axiosJWT";
import { checkData } from "../../../../util/chekData";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { SingleCustomer } from "../SingleCustomer/SingleCustomer";
import notify from "../../../../util/notify";

export function AllCustomers(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const navigate = useNavigate();


    useEffect(() => {
        if(myStore.getState().auth.userType !== "ADMIN"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
        let returnCustomers: Customer[] = [];
        checkData();
        console.log("getting all customers.....");
        if (myStore.getState().admin.allCustomers.length <= 1) {
            axiosJWT.get("http://localhost:8080/allCustomers")
            .then(res => {
                console.log("data: ", res);
                for (let index = 0; index < res.data.length; index++) {
                    returnCustomers.push(new Customer(
                        res.data[index].id,
                        res.data[index].firstName,
                        res.data[index].lastName,
                        res.data[index].email,
                        res.data[index].password
                    
                    ));
                }
                console.log("we got customers:", returnCustomers.length);
                myStore.dispatch(getAllCustomersAction(returnCustomers));
                setCustomers(myStore.getState().admin.allCustomers);
            })
            .catch(err=>{
                navigate("/Login")
            });
        } else {
            console.log("from store:", myStore.getState().admin.allCustomers);
            setCustomers(myStore.getState().admin.allCustomers);
        }
    }, [myStore.getState().admin.allCustomers])

    return (
        <div className="AllCustomers">
            <h1>All Customers</h1>
           
            {customers.map(item => <SingleCustomer key={item.id} customer={item} />)}
        </div>
    );
}
