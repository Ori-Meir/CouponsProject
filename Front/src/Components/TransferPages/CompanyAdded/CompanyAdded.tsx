import { useNavigate } from "react-router-dom";
import "./CompanyAdded.css";

export function CompanyAdded(): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className="CompanyAdded">
            <div className="content">
                <h1>Company Added Successfully!</h1>
                <p>Your company has been added to our system.</p>
                <button className="homeButton" onClick={() => navigate("/")}>Go to Home Page</button>
            </div>
        </div>
    );
}
