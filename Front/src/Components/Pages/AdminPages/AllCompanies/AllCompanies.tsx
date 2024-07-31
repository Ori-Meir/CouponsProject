import { useEffect, useState } from "react";
import "./AllCompanies.css";
import { Company } from "../../../Models/Company";
import axios from "axios";
import { SingleCompany } from "../SingleCompany/SingleCompany";
import { myStore } from "../../../../redux/Store";
import { getAllCompaniesAction } from "../../../../redux/AdminReducer";
import axiosJWT from "../../../../util/axiosJWT";
import { useNavigate } from "react-router-dom";
import { checkData } from "../../../../util/chekData";
import notify from "../../../../util/notify";

export function AllCompanies(): JSX.Element {
    const [company, setCompany] = useState<Company[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(myStore.getState().auth.userType !== "ADMIN"){
            navigate("/Page404");
            notify.error("No Acess!!!!!");
        }
        let returnComapanies: Company[] = [];
        checkData();
        console.log("getting all companies.....")
        if (myStore.getState().admin.allCompanies.length <= 1) {
            axiosJWT.get("http://localhost:8080/allCompanies")
                .then(res => {
                    for (let index = 0; index < res.data.length; index++) {
                        returnComapanies.push(new Company(
                            res.data[index].id,
                            res.data[index].name,
                            res.data[index].email,
                            res.data[index].password,
                            res.data[index].coupons
                        ));
                    }
                    console.log("we got companies", returnComapanies.length);
                    myStore.dispatch(getAllCompaniesAction(returnComapanies));
                    setCompany(myStore.getState().admin.allCompanies);
                })
                .catch(err=>{
                    navigate("/Login")
                });
        } else {
            console.log("from store:", myStore.getState().admin.allCompanies);
            setCompany(myStore.getState().admin.allCompanies);
        }

    }, [myStore.getState().admin.allCompanies])

    return (
        <div className="AllCompanies">
            <h1>All companies</h1>
            {company.map(item => <SingleCompany key={item.id} company={item} />)}
        </div>
    );
}
