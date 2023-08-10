import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#E3F2FD", // Couleur bleu pâle
        color: "#2196F3", // Couleur bleue
        fontWeight: "bold",
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
        display: "flex",
        alignItems: "center", // Aligner le texte et le cercle de chargement au centre
    },
    loadingCircle: {
        width: "20px",
        height: "20px",
        border: "2px solid #2196F3", // Couleur bleue
        borderTop: "2px solid #E3F2FD", // Couleur bleu pâle
        borderRadius: "50%",
        animation: "$spin 2s linear infinite", // Animation de rotation
        marginRight: theme.spacing(1), // Espacement entre le cercle de chargement et le texte
    },
    "@keyframes spin": {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
    },
}));

const Loading = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.loadingCircle}></div>
            <Typography variant="body1">Chargement en cours...</Typography>
        </div>
    );
};

export default Loading;
