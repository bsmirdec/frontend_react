import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const MobilHomeLink = ({ theme }) => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
                variant="h6"
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: theme.palette.secondary.main,
                    textDecoration: "none",
                }}
            >
                COBAPP
            </Typography>
        </Link>
    );
};

export default MobilHomeLink;
