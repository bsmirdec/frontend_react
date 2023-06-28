import React from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';


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

export default Deposits