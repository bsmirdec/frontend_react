import { useState } from "react";
import React from "react";
import RequireAuth from "../../auth/components/RequireAuth";
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
} from "@mui/material";

const drawerWidth = 240;

const WorksiteList = ({
    worksites,
    setActiveWorksite,
    onCreateNewWorksite,
}) => {
    function handleWorksiteClick(worksiteId) {
        const selectedWorksite = worksites.find(
            (worksite) => worksite.worksite_id === worksiteId,
        );
        setActiveWorksite(selectedWorksite.worksite_id);
    }

    const [displayCreateButton, setDisplayCreateButton] = useState(false);
    function handleCreateWorksiteClick() {
        onCreateNewWorksite();
        setDisplayCreateButton(!displayCreateButton);
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
                        position: "inherit",
                    },
                }}
            >
                <Box sx={{ overflow: "auto" }}>
                    <RequireAuth
                        allowedPermissions={[
                            PERMISSIONS.worksite_create_object,
                        ]}
                    >
                        <ListItemButton onClick={handleCreateWorksiteClick}>
                            {!displayCreateButton
                                ? "Créer Nouveau Chantier"
                                : "Retour"}
                        </ListItemButton>
                    </RequireAuth>
                    <Divider />
                    <List>
                        {worksites.map((worksite) => (
                            <ListItem key={worksite.name} disablePadding>
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
