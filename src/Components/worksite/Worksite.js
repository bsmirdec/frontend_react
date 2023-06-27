import React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Chart from './Chart';
import Orders from './Orders.tsx';

function preventDefault(event) {
  event.preventDefault();
}

function Deposits() {
    return (
      <React.Fragment>
        <Title>Recent Deposits</Title>
        <Typography component="p" variant="h4">
          $3,024.00
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on 15 March, 2019
        </Typography>
        <div>
          <Link color="primary" href="#" onClick={preventDefault}>
            View balance
          </Link>
        </div>
      </React.Fragment>
    );
  }

const Worksite = (props) => {
    const {worksite} = props
    if (!worksite || worksite.length === 0) return <p>Aucun chantier sélectionné</p>
    return (
        // <div>
        //     <h3>{worksite.city} - {worksite.name}</h3>
        // </div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
    )
}

export default Worksite