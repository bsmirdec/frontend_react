import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Button
            onClick={goBack}
            to="/"
            variant="contained"
            color="primary"
            style={{ width: "200px" }}
        >
            Retour
        </Button>
    );
};

export default BackButton;
