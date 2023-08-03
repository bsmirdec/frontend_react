import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../services/api/axios";
import { useNavigate } from "react-router-dom";

import SubmitButton from "../../../components/forms/SubmitButton";
import ValidationTextField from "../../../components/forms/ValidationTextField";
import FormBox from "../../../components/forms/FormBox";
// Material UI
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import isNameValid from "../../../utils/validation/name";

export default function Confirmation() {
    const theme = useTheme();
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");
    const [isWaitingForConfirmation, setIsWaitingForConfirmation] =
        useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
    });

    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const errorRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
    }, [formData.first_name, formData.last_name]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const v1 = isNameValid(formData.first_name);
        const v2 = isNameValid(formData.last_name);
        if (!v1 || !v2) {
            setErrorMessage("Mauvaise saisie");
            return;
        }

        axiosInstance
            .post("users/match/", {
                user_id: userId,
                first_name: formData.first_name,
                last_name: formData.last_name,
            })
            .then((res) => {
                console.log(res.data);
                setResponse(res.data);
                setIsWaitingForConfirmation(true);
                localStorage.setItem("is_confirmed", false);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Une erreur s'est produite.");
                }
                setResponse(null);
            });
    };

    const handleCancel = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("is_validated");
        navigate("/create/");
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <p
                    ref={errorRef}
                    className={errorMessage ? "errormessage" : "offscreen"}
                >
                    {errorMessage}
                </p>
                {isWaitingForConfirmation ? (
                    <Typography component="h1" variant="h5">
                        En attente de confirmation administrateur...
                    </Typography>
                ) : (
                    <FormBox>
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Confirmation du compte
                        </Typography>
                        <FormBox
                            component="form"
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ValidationTextField
                                        id="first_name"
                                        label="Prénom"
                                        type="name"
                                        autoComplete="first_name"
                                        validationFunc={isNameValid}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ValidationTextField
                                        id="last_name"
                                        label="Nom"
                                        type="name"
                                        autoComplete="last_name"
                                        validationFunc={isNameValid}
                                        helperText={
                                            "Veuillez entrer un nom valide : les caractères spéciaux et chiffres sont interdits"
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <SubmitButton onClick={handleSubmit}>
                                Vérifier
                            </SubmitButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link
                                        href="#"
                                        variant="body2"
                                        onClick={handleCancel}
                                    >
                                        Retour
                                    </Link>
                                </Grid>
                            </Grid>
                        </FormBox>
                    </FormBox>
                )}
            </Container>
        </ThemeProvider>
    );
}
