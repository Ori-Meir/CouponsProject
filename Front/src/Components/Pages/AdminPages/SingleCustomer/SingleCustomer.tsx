import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import "./SingleCustomer.css";
import { FC, useEffect } from "react";
import { myStore } from "../../../../redux/Store";
import notify from "../../../../util/notify";

interface SingleCustomerProps {
    customer: Customer;
}

export const SingleCustomer: FC<SingleCustomerProps> = ({ customer }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (myStore.getState().auth.userType !== "ADMIN") {
            navigate("/Page404");
            notify.error("No Access!");
        }
    }, []);

    return (
        <div className="SingleCustomer Box">
            <div className="Grid-Parent">
                <div className="Grid-Child UpdateButton" onClick={() => {
                    navigate(`/updateCustomer/${customer.id}`)
                }}>
                    Update Customer
                </div>
                <div className="Grid-Child CustomerInfo">
                    <h3>{customer.firstName} {customer.lastName}</h3>
                    <p>Email: {customer.email}</p>
                    <p>ID: {customer.id}</p>
                </div>
                <div onClick={() => {
                    navigate("/updateCustomer")
                }}>
                </div>
            </div>
        </div>
    );
};