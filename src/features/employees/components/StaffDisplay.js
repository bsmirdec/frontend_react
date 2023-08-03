import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Typography,
    Card,
    CardContent,
    Button,
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const StaffDisplay = () => {
    const classes = useStyles();
    const [team, setTeam] = useState([]);

    useEffect(() => {
        // Récupérer l'équipe d'un manager en utilisant l'API appropriée
        axios
            .get("/api/get-staff/") // Assurez-vous de configurer correctement l'URL pour la vue GetStaffAPI
            .then((response) => {
                setTeam(response.data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération de l'équipe:",
                    error,
                );
            });
    }, []);

    return (
        <div>
            <Typography variant="h4">Équipe du Manager</Typography>
            {team.map((employee) => (
                <Card className={classes.card} key={employee.employee_id}>
                    <CardContent>
                        <Typography>Nom : {employee.first_name}</Typography>
                        <Typography>Prénom : {employee.last_name}</Typography>
                        <Typography>Poste : {employee.position}</Typography>
                        {/* Afficher les chantiers sur lesquels ils sont affectés */}
                        {/* Bouton "changer affectation" */}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Changer affectation
                        </Button>
                        {/* Bouton "autorisations" avec le lien vers DisplayPermissions */}
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Autorisations
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StaffDisplay;
