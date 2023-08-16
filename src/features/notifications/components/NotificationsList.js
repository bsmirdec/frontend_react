import React from "react";
import { List, ListItem, ListItemText, Divider, Paper } from "@mui/material";

const NotificationsList = () => {
    const notifications = [
        { id: 1, contenu: "Nouvelle notification 1" },
        { id: 2, contenu: "Nouvelle notification 2" },
        // Ajoute d'autres notifications ici
    ];

    return (
        <Paper elevation={0}>
            <List>
                {notifications.map((notification) => (
                    <React.Fragment key={notification.id}>
                        <ListItem>
                            <ListItemText primary={notification.contenu} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default NotificationsList;
