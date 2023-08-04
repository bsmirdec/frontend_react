import Button from "@mui/material/Button";
import ErrorMessage from "../../../components/forms/ErrorMessage";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
    const message = "Autorisation nécessaire";
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div>
            <ErrorMessage message={message} />
            <Button onClick={goBack} to="/" variant="contained" color="primary">
                Retour
            </Button>
        </div>
    );
}
