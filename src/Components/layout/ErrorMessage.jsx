import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffebee",
        color: "#f44336",
        fontWeight: "bold",
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
}));

const ErrorMessage = React.forwardRef(({ message }, ref) => {
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

export default ErrorMessage;
