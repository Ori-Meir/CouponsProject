import { FC, useEffect } from "react";
import { Company } from "../../../Models/Company";
import "./SingleCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { myStore } from "../../../../redux/Store";
import notify from "../../../../util/notify";

interface SingleCompanyProps {
    company: Company;
}

export const SingleCompany: FC<SingleCompanyProps> = ({ company }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (myStore.getState().auth.userType !== "ADMIN") {
            navigate("/Page404");
            notify.error("No Access!");
        }
    }, [])

    return (
        <div className="SingleCompany Box">
            <div className="Grid-Parent">
                <div className="Grid-Child UpdateButton" onClick={() => {
                    navigate(`/updateCompany/${company.id}`)
                }}>
                    Update Comapny
                </div>
                <div className="Grid-Child CustomerInfo">
                    <h3>{company.name}</h3>
                    <p>Email: {company.email}</p>
                    <p>ID: {company.id}</p>
                </div>
                <div onClick={() => {
                    navigate("/updateCompany")
                }}>
                </div>
            </div>
        </div>
    );
};