import Button from "@mui/material/Button";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Unauthorized() {
    const message = "Autorisation nécessaire";
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    useEffect(() => {
        console.log(location.state.from);
    });

    return (
        <div>
            <ErrorMessage message={message} />
            <Button onClick={goBack} to="/" variant="contained" color="primary">
                Retour
            </Button>
        </div>
    );
}
