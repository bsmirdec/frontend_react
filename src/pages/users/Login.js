import React, { useState } from 'react';
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
    // const [user, setUser] = useState({
    //   email:null,
    //   password: null,
    //   first_name: null,
    //   last_name: null
    // })
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    })

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
        // setUser({...user, [e.target.name]: e.target.value.trim()});
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
                  localStorage.setItem('email', jwtDecode(res.data.access_token).email);
                  localStorage.setItem('first_name', jwtDecode(res.data.access_token).first_name);
                  axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
                  navigate('/');
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
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Se souvenir de moi _ne fonctionne pas encore"
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