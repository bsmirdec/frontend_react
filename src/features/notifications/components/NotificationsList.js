import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteNotificationMutation from "../hooks/useDeleteNotificationMutation";
import useUpdateReadNotificationMutation from "../hooks/useUpdateReadNotificationMutation";

import {
    Paper,
    Typography,
    Box,
    Badge,
    IconButton,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/styles";
import { styled } from "@mui/system";

const DateTime = styled("span")({
    color: "grey",
    textDecoration: "bold",
    marginRight: "10px",
});

const StyledPaper = styled(Paper)(({ is_read, link }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: 600,
    backgroundColor: "#f5f5f5",
    cursor: is_read ? (link ? "pointer" : "default") : "pointer",
    position: "relative",
}));

const NotificationsList = ({
    onClose,
    notifications,
    newNotifications,
    setNewNotifications,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const deleteNotification = useDeleteNotificationMutation();
    const updateReadNotification = useUpdateReadNotificationMutation();

    useEffect(() => {
        if (notifications) {
            const newNotificationsCount = notifications.filter(
                (notification) => !notification.is_read,
            ).length;
            setNewNotifications(newNotificationsCount);
        }
    }, [notifications, setNewNotifications]);

    const handleNotificationClick = async (notification) => {
        if (!notification.is_read) {
            const updateNotif = await updateReadNotification.mutateAsync(
                notification.notif_id,
            );
            console.log(updateNotif);
        }
        if (notification.link) {
            navigate(notification.link);
            onClose();
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        await deleteNotification.mutateAsync(notificationId);
    };

    const handleDeleteAll = async () => {
        for (const notif of notifications) {
            await handleDeleteNotification(notif.notif_id);
        }
    };

    const sortedNotifications = notifications.slice().sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
        <Box>
            <Box style={{ display: "flex" }}>
                <Typography variant="h4">Notifications</Typography>
                <Button
                    style={{
                        marginLeft: "auto",
                        color: theme.palette.secondary.main,
                    }}
                    onClick={handleDeleteAll}
                >
                    Tout supprimer
                </Button>
            </Box>
            {sortedNotifications.map((notification) => (
                <StyledPaper
                    key={notification.created_at}
                    elevation={3}
                    onClick={() => handleNotificationClick(notification)}
                    {...(notification.is_read ? { is_read: "true" } : {})}
                    {...(notification.link ? { link: "true" } : {})}
                >
                    <Badge
                        color="error"
                        badgeContent="!"
                        style={{
                            display: notification.is_read ? "none" : "flex",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    ></Badge>
                    <Typography variant="body1">
                        <DateTime>
                            {new Date(notification.created_at).toLocaleString()}
                        </DateTime>
                        {notification.content}
                    </Typography>
                    <IconButton
                        color="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.notif_id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </StyledPaper>
            ))}
        </Box>
    );
};

export default NotificationsList;
