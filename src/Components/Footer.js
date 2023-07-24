import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useTheme } from '@emotion/react';


const footers = [
  {
    title: 'Contacts',
    description: ['Dépôt', 'Acceuil', 'Répertoire'],
  },
  {
    title: 'Commentaires',
    description: ['signaler un bug', 'soumettre une idée'],
  },
];


export default function Footer() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
        <Box
          component="footer"
          sx={{
            py: 0,
            px: 0,
            mt: 0,
            width: '100vw',
            position: 'fixed',
            bottom: 0,
            left: 0,
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Grid container spacing={10} justifyContent="space-evenly">
            {footers.map((footer) => (
            <Grid item xs={6} sm={6} key={footer.title} sx={{display: 'flex'}}>
              <Typography variant="h6" color="text.primary" gutterBottom sx={{alignSelf:'center'}}>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
          </Container>
        </Box>
    </ThemeProvider>
  );
}