import "./Header.css";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { myStore } from "../../../redux/Store";
import { checkData } from "../../../util/chekData";
import { useEffect, useState } from "react";
import { logoutAction } from "../../../redux/authReducer";
import { useNavigate } from "react-router-dom";


export function Header(): JSX.Element {
    const [isLogged, setLogged] = useState(false);
    const [userName, setName] = useState("");

    useEffect(() => {
        checkData();
    }, [])
    myStore.subscribe(() => {
        setName(myStore.getState().auth.name);
        setLogged(myStore.getState().auth.isLogged);
    })

    const navigate = useNavigate();
    return (
        <div className="Header">
            <div>
                <Typography variant="h3" className="HeadLine">Coupons Website</Typography>
            </div>
            <div className="login">
                Hello {userName} <br />
                <Button type="submit" color={isLogged ? "secondary" : "info"}
                    onClick={() => {
                        if (isLogged) {
                            sessionStorage.removeItem("jwt");
                            myStore.dispatch(logoutAction());
                            navigate("/")
                        } else {
                            navigate("/Login")
                        }
                    }}>{isLogged ? "Logout" : "Login"}</Button>
                {!isLogged && <Button value="Register" color="primary" onClick={() => navigate("/register")}>Register</Button>}

            </div>
        </div>
    );
}
