import React from "react";
// import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from './Chart';
import Orders from './Orders';
import Deposits from './Deposits';

const Worksite = (props) => {
    const {worksite} = props
    if (!worksite || worksite.length === 0) return <p>Aucun chantier sélectionné</p>
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div>
        <h3 style={{padding: '20px', }}>{worksite.city} - {worksite.name}</h3>
      </div>
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