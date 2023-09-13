import React, { useEffect, useState } from "react";
import useAuth from "../../../features/auth/hooks/useAuth";
import useNotificationQuery from "../../../features/notifications/hooks/useNotificationQuery";
import NotificationsList from "../../../features/notifications/components/NotificationsList";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import {
    Box,
    Tooltip,
    IconButton,
    Badge,
    Popover,
    Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsMenu = () => {
    const { auth } = useAuth();
    const {
        notifications,
        isNotificationsLoading,
        isNotificationsError,
        notificationsError,
    } = useNotificationQuery(auth.userId);
    const [newNotifications, setNewNotifications] = useState("");
    const [anchorElNotif, setAnchorElNotif] = useState(null);

    const handleOpenNotifMenu = (event) => {
        setAnchorElNotif(event.currentTarget);
    };

    const handleCloseNotifMenu = () => {
        setAnchorElNotif(null);
    };

    const open = Boolean(anchorElNotif);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        if (notifications) {
            const newNotificationsCount = notifications.filter(
                (notification) => !notification.is_read,
            ).length;
            setNewNotifications(newNotificationsCount);
        }
    }, [notifications, setNewNotifications]);

    if (isNotificationsLoading) {
        return <Loading />;
    }

    if (isNotificationsError) {
        return <ErrorMessage message={notificationsError.message} />;
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip
                title="Notifications"
                style={{ marginRight: "20px", fontSize: 50 }}
            >
                <IconButton
                    color="inherit"
                    onClick={handleOpenNotifMenu}
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorElNotif}
                onClose={handleCloseNotifMenu}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box p={2}>
                    {notifications.length > 0 ? (
                        <NotificationsList
                            notifications={notifications}
                            newNotifications={newNotifications}
                            setNewNotifications={setNewNotifications}
                            onClose={handleCloseNotifMenu}
                        />
                    ) : (
                        <Typography>Pas de notification</Typography>
                    )}
                </Box>
            </Popover>
        </Box>
    );
};

export default NotificationsMenu;
