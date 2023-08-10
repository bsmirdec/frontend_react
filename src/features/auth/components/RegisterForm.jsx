import { useRef, useState, useEffect } from "react";
import axiosInstance from "../../../services/api/axios";
import { useNavigate } from "react-router-dom";
import isEmailValid from "../../../utils/validation/email";
import isPasswordValid from "../../../utils/validation/password";
import isNameValid from "../../../utils/validation/name";

import SubmitButton from "../../../components/forms/SubmitButton";
import ValidationTextField from "../../../components/forms/ValidationTextField";
import FormBox from "../../../components/forms/FormBox";
import ErrorMessage from "../../../components/layout/ErrorMessage";
// Material UI
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Register() {
    const navigate = useNavigate();

    const isMatchPasswordValid = (matchPassword, password) => {
        return matchPassword === password;
    };

    const initialFormData = Object.freeze({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        if (e.target.name !== "match-password") {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const errorRef = useRef();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage("");
    }, [formData.email, formData.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const v1 = isEmailValid(formData.email);
        const v2 = isPasswordValid(formData.password);
        const v3 = isNameValid(formData.first_name);
        const v4 = isNameValid(formData.last_name);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrorMessage("Mauvaise saisie");
            return;
        }

        try {
            const response1 = await axiosInstance.post("users/create/", {
                email: formData.email,
                password: formData.password,
            });
            console.log(response1);
            console.log(response1.data);

            const response2 = await axiosInstance.post("users/match/", {
                user_id: response1.data.user_id,
                first_name: formData.first_name,
                last_name: formData.last_name,
            });
            console.log(response2);
            console.log(response2.data);
            updateFormData(initialFormData);
            navigate("/");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur lors de la création du compte");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <ErrorMessage ref={errorRef} message={errorMessage} />
            <FormBox>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Créer un compte
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
                                id="email"
                                label="Adresse Email"
                                type="email"
                                validationFunc={isEmailValid}
                                helperText={
                                    "Veuillez entrer une adresse email valide."
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidationTextField
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="off"
                                validationFunc={isPasswordValid}
                                helperText={
                                    "Veuillez entrer un mot de passe de 8 caractères minimum."
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidationTextField
                                label="Confirmation mot de passe"
                                type="password"
                                id="match-password"
                                validationFunc={(value) =>
                                    isMatchPasswordValid(
                                        value,
                                        document.getElementById("password")
                                            .value,
                                    )
                                }
                                helperText={
                                    "Veuillez entrer un mot de passe indentique."
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ValidationTextField
                                id="first_name"
                                label="Prénom"
                                type="name"
                                autoComplete="first_name"
                                validationFunc={isNameValid}
                                helperText={
                                    "Veuillez entrer un nom valide : les caractères spéciaux et chiffres sont interdits"
                                }
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
                        Créer un compte
                    </SubmitButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Vous avez déjà un compte ? Se connecter
                            </Link>
                        </Grid>
                    </Grid>
                </FormBox>
            </FormBox>
        </Container>
    );
}
