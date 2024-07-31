import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import notify from '../../../../util/notify';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';
import axiosJWT from '../../../../util/axiosJWT';
import { checkData } from '../../../../util/chekData';
import { myStore } from '../../../../redux/Store';
import { deleteCompanyAction } from '../../../../redux/AdminReducer';

export function DeleteCompany(): JSX.Element {
    const [companyId, setCompanyId] = useState('');
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
        axiosJWT.delete(`http://localhost:8080/deleteCompany/${companyId}`)
            .then((data) => {
                myStore.dispatch(deleteCompanyAction(parseInt(companyId)))
                notify.success("Company is deleted successfully!");
                navigate("/allCompanies");
            })
            .catch(error => {
                notify.error("Error while deleting this company")

            });
    };

    return (
        <div className="delete-company Box">
            <Typography variant="h4" className="HeadLine">Delete Company</Typography> <br /><br />
            <TextField label="Company ID to delete" variant="outlined" value={companyId} onChange={(e) => setCompanyId(e.target.value)} /> <br />
            <br /> 
            <hr />
            <ButtonGroup variant="contained" fullWidth>
                <Button type ="submit" color="success" onClick={handleDelete} >Delete Company</Button>
                <Button type="button" color="error" onClick={() => navigate("/allCompanies")} >Cancel</Button>
            </ButtonGroup>
        </div>
    );
}