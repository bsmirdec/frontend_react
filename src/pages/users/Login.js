import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function LogIn() {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
        rememberMe: false,
    })

    const [formData, updateFormData] = useState(initialFormData);

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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Se connecter
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox 
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                color="primary" />}
              label="Se souvenir de moi"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe oublié?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" to="create/">
                  {"Pas de compte? Créer un compte"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}