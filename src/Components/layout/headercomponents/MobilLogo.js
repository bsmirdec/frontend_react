import logo from "../../../assets/cobat-logo.png";
import Box from "@mui/material/Box";

const MobilLogo = () => {
    return (
        <Box
            component="img"
            src={logo}
            alt="Cobat-Constructions"
            title="Cobat-Constructions"
            sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                height: "40px",
            }}
        />
    );
};

export default MobilLogo;
