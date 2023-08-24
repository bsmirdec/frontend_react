import React from "react";
import useAuth from "../../auth/hooks/useAuth";
import useNotificationQuery from "../hooks/useNotificationQuery";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

// Style personnalisé pour la date et l'heure
const DateTime = styled("span")({
    color: "grey",
    textDecoration: "underline",
    marginRight: "10px",
});

// Style personnalisé pour le message
const StyledMessage = styled(Typography)({
    backgroundColor: "#e1f5fe", // primary.light background color
    padding: "5px",
    borderRadius: "5px",
});

const NotificationsComponent = () => {
    const { auth } = useAuth();
    const {
        data: notifications,
        isLoading,
        isError,
    } = useNotificationQuery(auth.userId); // Utilisation du hook

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message} />;
    }

    return (
        <div>
            {notifications.map((notification) => (
                <Paper
                    key={notification.created_at}
                    elevation={3}
                    style={{ marginBottom: "10px", padding: "10px" }}
                >
                    <StyledMessage>
                        <DateTime>
                            {new Date(notification.created_at).toLocaleString()}
                        </DateTime>
                        <span style={{ fontWeight: 500 }}>
                            {notification.content}
                        </span>
                    </StyledMessage>
                </Paper>
            ))}
        </div>
    );
};

export default NotificationsComponent;
