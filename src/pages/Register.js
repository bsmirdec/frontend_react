import { useRef, useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useNavigate} from 'react-router-dom';
import isEmailValid from '../utils/validation/email'
import isPasswordValid from '../utils/validation/password'

import SubmitButton from '../components/forms/SubmitButton';
import FormTextField from '../components/forms/FormTextfield';
import CustomTextField from '../components/forms/ValidationTextField';
import FormBox from '../components/forms/FormBox'
// Material UI
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import InfoIcon from '@mui/icons-material/Info'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import ValidationTextField from '../components/forms/ValidationTextField';


export default function Register() {
    const theme = useTheme()
    const navigate = useNavigate()

    const isMatchPasswordValid = (matchPassword, password) => {
        return matchPassword === password;
    };
    
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    })
    
    const [formData, updateFormData] = useState(initialFormData);
    
    const handleChange = (e) => {
        if (e.target.name != "match-password") {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim(),
            })
        }
    }
    
    const errorRef = useRef()
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage('');
    }, [formData.email, formData.password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const v1 = isEmailValid(formData.email)
        const v2 = isPasswordValid(formData.password)
        if(!v1 || !v2) {
            setErrorMessage("Mauvaise saisie")
            return;
        }
        console.log(formData.password)
        axiosInstance
        .post('users/create/', {
            email: formData.email,
            password: formData.password,
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            const userIdFromResponse = res.data.user_id
            localStorage.setItem("user_id", userIdFromResponse)
            navigate('/confirm');
        })
        .catch((error) => {
            console.error(error)
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur lors de la création du compte")
            }
        })
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <p ref={errorRef} className={errorMessage ? "errormessage" : "offscreen"}>{errorMessage}</p>
                <FormBox>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Créer un compte
                    </Typography>
                    <FormBox component="form" onChange={handleChange} onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ValidationTextField
                                id="email"
                                label="Adresse Email"
                                type="email"
                                autoComplete="on"
                                validationFunc={isEmailValid}
                                helperText={"Veuillez entrer une adresse email valide."}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ValidationTextField
                                label="Mot de passe"
                                type="password"
                                id="password"
                                validationFunc={isPasswordValid}
                                helperText={"Veuillez entrer un mot de passe de 8 caractères minimum."}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ValidationTextField
                                label="Confirmation mot de passe"
                                type="password"
                                id="match-password"
                                validationFunc={(value) => isMatchPasswordValid(value, document.getElementById("password").value)}
                                helperText={"Veuillez entrer un mot de passe indentique."}
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
        </ThemeProvider>
    )
}