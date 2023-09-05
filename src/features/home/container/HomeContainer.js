import React from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import OrderTable from "../../request/components/OrderTable";
import NotificationsComponent from "../../notifications/components/NotificationsList";

const Home = () => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h2" component="h1" align="center" gutterBottom>
                Accueil
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "1rem" }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Commandes
                        </Typography>
                        <OrderTable />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "1rem" }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Notifications
                        </Typography>
                        <NotificationsComponent />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
