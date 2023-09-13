import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBusiness } from "../../../features/permissions/context/BusinessContext";
import {
    Box,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Divider,
} from "@mui/material";
import { useTheme } from "@mui/material";

const UserMenu = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { businessData } = useBusiness();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        handleCloseUserMenu();
        navigate("/auth/logout");
    };

    const UserAvatar = ({ firstName, lastName, style }) => {
        const getInitials = () => {
            const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
            return initials.toUpperCase();
        };
        return <Avatar style={style}>{getInitials()}</Avatar>;
    };
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {businessData.firstName ? (
                        <UserAvatar
                            firstName={businessData.firstName}
                            lastName={businessData.lastName}
                            style={{
                                backgroundColor: theme.palette.secondary.light,
                            }}
                        />
                    ) : (
                        <UserAvatar
                            firstName="?"
                            lastName=""
                            style={{
                                backgroundColor: theme.palette.secondary.light,
                            }}
                        />
                    )}
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <Typography
                    variant="h6"
                    style={{
                        textAlign: "center",
                        color: "primary",
                    }}
                >
                    {businessData.firstName} {businessData.lastName}
                </Typography>
                <Divider />
                <MenuItem key="account" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Mon compte</Typography>
                </MenuItem>
                <MenuItem key="logout" onClick={handleLogout}>
                    <Typography textAlign="center">Déconnexion</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
