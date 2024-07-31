import { Typography } from "@mui/material";
import "./CompanyDetails.css";
import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import { useNavigate } from "react-router-dom";
import { myStore } from "../../../../redux/Store";
import notify from "../../../../util/notify";
import { checkData } from "../../../../util/chekData";
import axiosJWT from "../../../../util/axiosJWT";
import { companyDetailsAction } from "../../../../redux/CompanyReducer";

export function CompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkData();
        if(myStore.getState().auth.userType !== "COMPANY"){
            navigate("/Page404");
            notify.error("No Access");

        }
        const companyDetails = myStore.getState().company.companyDetails;
        const authId = myStore.getState().auth.id;

        console.log("Company details from store:", companyDetails);
        console.log("Auth ID from store:", authId);

        if (!companyDetails || companyDetails.id === -1) {
            axiosJWT.get(`http://localhost:8080/companyDetails/${authId}`)
                .then(res => {
                    console.log("Fetched company details:", res.data);
                    setCompany(res.data);
                    myStore.dispatch(companyDetailsAction(res.data));
                })
                .catch(err => {
                    console.error("Failed to fetch company details:", err);
                    if (err.response) {
                        console.error("Error response data:", err.response.data);
                        console.error("Error response status:", err.response.status);
                        console.error("Error response headers:", err.response.headers);
                    }
                    notify.error("Failed to fetch company details. Please check your request parameters and try again.");
                });
        } else {
            setCompany(companyDetails);
        }
    }, []);

    if (!company) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div className="CompanyDetails">
            <Typography variant="h2" style={{color:"ThreeDDarkShadow"}}>Company Details</Typography><br />
            <Typography variant="h4" className="HeadLine">Name : {company.name}</Typography>
            <br />
            <Typography variant="h6" className="HeadLine">Email : {company.email}</Typography>

        </div>
    );
}
