import React, { useState } from "react";
import NotificationsModal from "../../../features/notifications/components/NotificationsModal";
import { Box, Tooltip, IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
        useState(false);
    const [newNotifications, setNewNotifications] = useState(false);

    const handleOpenNotificationsModal = () => {
        setIsNotificationsModalOpen(true);
    };

    const handleCloseNotificationsModal = () => {
        setIsNotificationsModalOpen(false);
    };

    return (
        <Box>
            <Tooltip
                title="Notifications"
                style={{ marginRight: "20px", fontSize: 50 }}
            >
                <IconButton
                    color="inherit"
                    onClick={handleOpenNotificationsModal}
                    sx={{ p: 0 }}
                >
                    <Badge
                        badgeContent={
                            newNotifications ? newNotifications : null
                        }
                        color="error"
                    >
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            {/* Modal de Notifications */}
            <NotificationsModal
                isOpen={isNotificationsModalOpen}
                onClose={handleCloseNotificationsModal}
                newNotifications={newNotifications}
                setNewNotifications={setNewNotifications}
            />
        </Box>
    );
};

export default Notifications;
