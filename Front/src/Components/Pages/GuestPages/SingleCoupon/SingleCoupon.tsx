import { useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import "./SingleCoupon.css";
import { Typography } from "@mui/material";
import { Store } from "@mui/icons-material";
import { myStore } from "../../../../redux/Store";


interface couponProps {
    coupon: Coupon;
}

export function SingleCoupon(props: couponProps): JSX.Element {
    const IMAGE_WIDTH=200;
    const navigate = useNavigate();

    return (
        <div className="SingleCoupon Box" onClick={() => {
            navigate(`/viewCoupon/${props.coupon.id}`)
        }}>
            <div className="Grid-Parent">
                <div className="Grid-Child">
                    <img src={props.coupon.image} width={IMAGE_WIDTH} />
                </div>
                <div className="Grid-Child">
                    <Typography variant="h5">{props.coupon.id}. {props.coupon.title}</Typography>
                </div>
               
            </div>



        </div>
    );
}
