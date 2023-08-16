import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#e8f5e9", // Nuance de vert clair
        color: "#4caf50", // Couleur verte
        fontWeight: "bold",
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
    },
}));

const SuccessMessage = React.forwardRef(({ message }, ref) => {
    const classes = useStyles();

    if (
        !message ||
        (typeof message === "object" && Object.keys(message).length === 0)
    ) {
        return null;
    }

    return (
        <Typography variant="body1" className={classes.root} ref={ref}>
            {message}
        </Typography>
    );
});

export default SuccessMessage;
