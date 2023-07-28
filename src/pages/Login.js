import { useRef, useState, useEffect } from 'react'
import axiosInstance from '../axios';
import { useNavigate} from 'react-router-dom';

import SubmitButton from '../components/forms/SubmitButton';
import FormTextField from '../components/forms/FormTextfield';
import FormBox from '../components/forms/FormBox'
// Material UI
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import ValidationTextField from '../components/forms/ValidationTextField';


export default function Login() {
    const theme = useTheme()
    const navigate = useNavigate()

    const initialFormData = Object.freeze({
        email: '',
        password: '',
        rememberMe: false,
    })

    const [formData, updateFormData] = useState(initialFormData);
    
    const errorRef = useRef()
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        const storedEmail = localStorage.getItem('remembered_email');
        const storedPassword = localStorage.getItem('remembered_password');
        const storedRememberMe = localStorage.getItem('remembered_rememberMe');
        if (storedEmail && storedPassword) {
            updateFormData((prevFormData) => ({
                ...prevFormData,
                email: storedEmail,
                password: storedPassword,
                rememberMe: storedRememberMe === 'true',
            }));
        }
    }, [formData]);
  
    const handleChange = (e) => {
        localStorage.clear();
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        updateFormData({
            ...formData,
            [e.target.name]: value,
        });
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
  
        axiosInstance
            .post('token/', {
                email: formData.email,
                password: formData.password,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
    
                // Vérifier les valeurs de access et refresh
                if (res.data.access_token && res.data.refresh_token) {
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);
                    localStorage.setItem('user_id', jwtDecode(res.data.access_token).user_id);
                    localStorage.setItem('email', jwtDecode(res.data.access_token).email);
                    localStorage.setItem('password', jwtDecode(res.data.access_token).password)
                    localStorage.setItem('first_name', jwtDecode(res.data.access_token).first_name);
                    localStorage.setItem('last_name', jwtDecode(res.data.access_token).last_name);
                    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
                    navigate('/');
  
                axiosInstance
                    .get('/users/permissions/', {
                        headers: {
                            Authorization: `JWT ${res.data.access_token}`,
                        },
                    })
                    .then((response) => {
                        localStorage.setItem('user_permissions', JSON.stringify(response.data));
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error(error);
                        // Gérer l'erreur ici et afficher un message d'erreur approprié
                });
  
                // Stocker les valeurs des champs email et password si "Se souvenir de moi" est coché
                if (formData.rememberMe) {
                    localStorage.setItem('remembered_email', formData.email);
                    localStorage.setItem('remembered_password', formData.password);
                    localStorage.setItem('remembered_rememberMe', formData.rememberMe);
                } else {
                    localStorage.removeItem('remembered_email');
                    localStorage.removeItem('remembered_password');
                    localStorage.removeItem('remembered_rememberMe');
                }
            } else {
                console.error('Les valeurs access et refresh sont manquantes.');
                // Gérer l'erreur ici et afficher un message d'erreur approprié
            }
        })
        .catch((error) => {
            console.error(error);
            // Gérer l'erreur ici et afficher un message d'erreur approprié
        });
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
                        Connexion
                    </Typography>
                    <FormBox component="form" onChange={handleChange} onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormTextField
                                    id="email"
                                    label="Adresse Email"
                                    type="email"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormTextField
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                            <Grid item sx={12}>
                                <FormControlLabel
                                    control={<Checkbox 
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    name="rememberMe"
                                    color="primary" />}
                                    label="Se souvenir de moi"
                                />
                            </Grid>
                        </Grid>
                        <SubmitButton onClick={handleSubmit}>
                            Me connecter
                        </SubmitButton>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Mot de passe oublié?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" to="create/">
                                    {"Créer un compte"}
                                </Link>
                            </Grid>
                        </Grid>
                    </FormBox>
                </FormBox>
            </Container>
        </ThemeProvider>
    )
}