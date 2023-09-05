import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllowedPermission from "../../permissions/components/AllowedPermission";
import { PERMISSIONS } from "../../permissions/PERMISSIONS";
import { useTheme } from "@emotion/react";
import {
    Box,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Toolbar,
} from "@mui/material";

const drawerWidth = 240;

const WorksiteList = ({ worksites, activeWorksite, setActiveWorksite }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    function handleWorksiteClick(worksiteId) {
        const selectedWorksite = worksites.find(
            (worksite) => worksite.worksite_id === worksiteId,
        );
        setActiveWorksite(selectedWorksite.worksite_id);
    }

    function handleCreateWorksite() {
        navigate("./create/");
    }

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <AllowedPermission
                        allowedPermissions={[
                            PERMISSIONS.worksite_create_object.code,
                        ]}
                    >
                        <ListItemButton onClick={handleCreateWorksite}>
                            Créer nouveau chantier
                        </ListItemButton>
                        <Divider />
                    </AllowedPermission>
                    <List>
                        {worksites.map((worksite) => (
                            <ListItem
                                key={`${worksite.name}-${worksite.city}`}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() =>
                                        handleWorksiteClick(
                                            worksite.worksite_id,
                                        )
                                    }
                                    style={{
                                        color:
                                            worksite.worksite_id ===
                                            activeWorksite
                                                ? "#FFFFFF"
                                                : "#000000",
                                        backgroundColor:
                                            worksite.worksite_id ===
                                            activeWorksite
                                                ? theme.palette.primary.light
                                                : "transparent",
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            worksite.city +
                                            " - " +
                                            worksite.name
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default WorksiteList;
