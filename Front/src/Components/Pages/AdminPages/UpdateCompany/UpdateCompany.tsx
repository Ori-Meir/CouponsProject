import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, ButtonGroup } from '@mui/material';
import notify from '../../../../util/notify';
import axiosJWT from '../../../../util/axiosJWT';
import { myStore } from '../../../../redux/Store';
import { Company } from '../../../Models/Company';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateCompanyAction } from '../../../../redux/AdminReducer';
import { checkData } from '../../../../util/chekData';
import cloneDeep from 'lodash/cloneDeep';


export default function UpdateCompany() {
    const navigate = useNavigate();
    const [company, setCompany] = useState<Company | null>(null);
    const { id } = useParams();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Company>();

    useEffect(() => {
        checkData();
        if (myStore.getState().auth.userType !== "ADMIN") {
            navigate("/Page404");
            notify.error("No Access!");

        }
        if (id) {
            const singleCompany = cloneDeep(myStore.getState().admin.allCompanies.find(item => item.id === +id));
            if (singleCompany) {
                setCompany(singleCompany);
                reset(singleCompany);
            }
        }
        if (myStore.getState().auth.token.length < 10) {
            navigate("/Login");
        }
    }, [id, reset, navigate]);

    const onSubmit: SubmitHandler<Company> = (data) => {
        const token = myStore.getState().auth.token;
        axiosJWT.put("http://localhost:8080/updateCompany", data, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                myStore.dispatch(updateCompanyAction(data));
                notify.success("Company updated successfully!");
                navigate("/allCompanies");
            })
            .catch(err => {
                console.error("Failed to update company:", err.response ? err.response.data : err);
                notify.error("Failed to update the company. " + (err.response ? err.response.data.message : ""));
            });
    };

    return (
        <div className="updateCompany">
            <div className="Box" style={{ width: "70%", height: "68vh", overflowY: "scroll" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4" className="HeadLine">Update Company</Typography> <br />
                    <TextField
                        label="Name"
                        type="text"
                        defaultValue={company?.name}
                        {...register("name")}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        defaultValue={company?.email}
                        {...register("email")}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        defaultValue={company?.password}
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <hr />
                    <ButtonGroup variant="contained" fullWidth>
                        <Button type="submit" variant="contained" color="primary">Update</Button>
                        <Button variant="contained" color="error" onClick={() => navigate("/allCompanies")}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}
