import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSiteDirectorListQuery from "../../employees/hooks/useDirectorListQuery";
import useCreateManagementMutation from "../../employees/hooks/useCreateManagementMutation";
import useCreateWorksiteNotificationMutation from "../../notifications/hooks/useCreateWorksiteNotificationMutation";
import Loading from "../../../components/layout/Loading";
import ErrorMessage from "../../../components/layout/ErrorMessage";
import SuccessMessage from "../../../components/layout/SuccessMessage";
import SubmitButton from "../../../components/forms/SubmitButton";
import FormBox from "../../../components/forms/FormBox";
// Material UI
import {
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

const AffectTeamWorksite = ({ page, setPage, worksite }) => {
    const {
        data: siteDirectors,
        isLoading,
        isError,
    } = useSiteDirectorListQuery();
    const createManagementMutation = useCreateManagementMutation();
    const createWorksiteNotification = useCreateWorksiteNotificationMutation();
    const [selectedDirector, setSelectedDirector] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createManagementMutation.mutateAsync({
                worksite_id: worksite.worksiteId,
                employee_id: selectedDirector,
            });
            const notif = await createWorksiteNotification.mutateAsync({
                worksite_id: worksite.worksiteId,
                content: `le chantier ${worksite.name} - ${worksite.city} a été créé avec succès. Votre équipe a été affecté au chantier, veuillez compléter les informations sur la page "Chantier" correspondante`,
            });
            console.log("Affectation au chantier:", response);
            console.log(notif);
            navigate("/worksite/");
        } catch (error) {
            console.error("Erreur lors de l'affectation:", error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <ErrorMessage message={isError.message.data.detail} />;
    }

    if (!siteDirectors) {
        return <p>Erreur de chargement du formulaire</p>;
    }

    return (
        <FormBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <SuccessMessage
                message={`${worksite.name} - ${worksite.city} créé avec succès !`}
            />
            <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <Typography
                    component="h1"
                    variant="h5"
                    margin="normal"
                    textAlign="center"
                    paddingBottom={10}
                >
                    Affecter une Équipe au Chantier
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="site-director-select-label">
                        Directeur Travaux
                    </InputLabel>
                    <Select
                        labelId="site-director-select-label"
                        id="site-director"
                        name="site-director"
                        label="Directeur Travaux"
                        value={selectedDirector}
                        onChange={(event) =>
                            setSelectedDirector(event.target.value)
                        }
                        margin="dense"
                    >
                        {siteDirectors.map((siteDirector) => (
                            <MenuItem
                                key={siteDirector.employee_id}
                                value={siteDirector.employee_id}
                            >
                                {siteDirector.first_name}{" "}
                                {siteDirector.last_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormBox
                    display="flex"
                    justifyContent="center"
                    marginTop="1rem"
                >
                    <SubmitButton color="primary" type="submit">
                        Enregistrer
                    </SubmitButton>
                </FormBox>
            </form>
        </FormBox>
    );
};

export default AffectTeamWorksite;
