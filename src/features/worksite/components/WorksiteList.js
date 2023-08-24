import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllowedPermission from "../../permissions/components/AllowedPermission";
import { PERMISSIONS } from "../../permissions/PERMISSIONS";
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

const WorksiteList = ({ worksites, setActiveWorksite }) => {
    const navigate = useNavigate();

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
