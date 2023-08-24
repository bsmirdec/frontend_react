import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const HomeLink = ({ theme }) => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
                variant="h5"
                noWrap
                sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: theme.palette.secondary.main,
                    textDecoration: "none",
                    paddingLeft: "20px",
                }}
            >
                COBAPP
            </Typography>
        </Link>
    );
};

export default HomeLink;
