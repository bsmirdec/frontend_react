import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const NavMenu = ({ pageList }) => {
    const navigate = useNavigate();
    const handlePageClick = (page) => {
        navigate(`/${page.address}/`);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
            }}
        >
            {pageList.map((page) => (
                <Button
                    key={page.name}
                    sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                    }}
                    onClick={() => handlePageClick(page)}
                >
                    {page.name}
                </Button>
            ))}
        </Box>
    );
};

export default NavMenu;
