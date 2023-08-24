import logo from "../../../assets/cobat-logo.png";
import Box from "@mui/material/Box";

const Logo = () => {
    return (
        <Box
            component="img"
            src={logo}
            alt="Cobat-Constructions"
            title="Cobat-Constructions"
            sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                height: "50px",
            }}
        />
    );
};

export default Logo;
