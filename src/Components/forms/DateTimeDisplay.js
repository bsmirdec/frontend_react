import React from "react";
import Typography from "@mui/material/Typography";

const DateTimeDisplay = ({ dateTime }) => {
    const formattedDate = new Date(dateTime);

    // Récupérer les composants de la date
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const year = String(formattedDate.getFullYear() % 100).padStart(2, "0"); // Obtenir les deux derniers chiffres de l'année
    const hours = String(formattedDate.getHours()).padStart(2, "0");
    const minutes = String(formattedDate.getMinutes()).padStart(2, "0");

    // Formater les composants de la date et de l'heure
    const formattedDateTime = `${day}/${month}/${year} - ${hours}:${minutes}`;

    return <Typography variant="body1">{formattedDateTime}</Typography>;
};

export default DateTimeDisplay;
