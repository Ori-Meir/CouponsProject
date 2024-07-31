import {useNavigate, useParams } from "react-router-dom";
import "./ViewCompany.css";
import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import axiosJWT from "../../../../util/axiosJWT";
import { myStore } from "../../../../redux/Store";
import notify from "../../../../util/notify";
import { Typography } from "@mui/material";
import { checkData } from "../../../../util/chekData";
import { getSingleComapnyAction } from "../../../../redux/AdminReducer";

export function ViewCompany(): JSX.Element {
    const params = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        if (myStore.getState().auth.userType !== "ADMIN") {
            navigate("/Page404");
            notify.error("No Acess!!!!!");

        }
        else {
            checkData();
            axiosJWT.get(`http://localhost:8080/singleCompany/${params.id}`)
                .then(res => {
                    setCompany(res.data);
                    myStore.dispatch(getSingleComapnyAction(res.data));
                })
                .catch((err) => {
                    notify.error("Cannot get single company");
                })
        }
    }, [])

    return (
        <div className="ViewCompany Box">
            <Typography variant="h5">Company details</Typography>
            id: {company?.id}<br />
            name: {company?.name} <br />
            Email: {company?.email}



        </div>
    );
}
