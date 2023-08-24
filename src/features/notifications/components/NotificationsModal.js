import React, { useEffect } from "react";
import useAuth from "../../auth/hooks/useAuth";
import useNotificationQuery from "../hooks/useNotificationQuery";
import useDeleteNotificationMutation from "../hooks/useDeleteNotificationMutation";
import useUpdateReadNotificationMutation from "../hooks/useUpdateReadNotificationMutation";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import Loading from "../../../components/layout/Loading";
import { Modal, Box, Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const DateTime = styled("span")({
    color: "grey",
    textDecoration: "underline",
    marginRight: "10px",
});

const StyledPaper = styled(Paper)(({ is_read }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: 600,
    backgroundColor: is_read ? "#f5f5f5" : "#e1f5fe",
    cursor: is_read ? "default" : "pointer",
}));

const NotificationsModal = ({
    isOpen,
    onClose,
    newNotifications,
    setNewNotifications,
}) => {
    const { auth } = useAuth();
    const {
        data: notificationsData,
        isLoading,
        isError,
    } = useNotificationQuery(auth.userId);
    const deleteNotification = useDeleteNotificationMutation();
    const updateReadNotification = useUpdateReadNotificationMutation();

    useEffect(() => {
        if (notificationsData) {
            const newNotificationsCount = notificationsData.filter(
                (notification) => !notification.is_read,
            ).length;
            setNewNotifications(newNotificationsCount);
        }
    }, [notificationsData, setNewNotifications]);

    const handleNotificationClick = async (notification) => {
        if (!notification.is_read) {
            const updateNotif = await updateReadNotification.mutateAsync(
                notification.notif_id,
            );
            console.log(updateNotif);
        }
    };

    const handleDeleteNotification = async (notificationId) => {
        const deleteNotif = await deleteNotification.mutateAsync(
            notificationId,
        );
        console.log(deleteNotif);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    const sortedNotifications = notificationsData.slice().sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="notifications-modal-title"
        >
            <Box sx={modalStyle}>
                <h2 id="notifications-modal-title">Notifications</h2>
                {sortedNotifications.map((notification) => (
                    <StyledPaper
                        key={notification.created_at}
                        elevation={3}
                        onClick={() => handleNotificationClick(notification)}
                        {...(notification.is_read ? { is_read: "true" } : {})}
                    >
                        <Typography variant="body1">
                            <DateTime>
                                {new Date(
                                    notification.created_at,
                                ).toLocaleString()}
                            </DateTime>
                            {notification.content}
                        </Typography>
                        <IconButton
                            color="error"
                            onClick={() =>
                                handleDeleteNotification(notification.notif_id)
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </StyledPaper>
                ))}
            </Box>
        </Modal>
    );
};

export default NotificationsModal;
