import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Container, Paper, Typography, Box } from "@mui/material";
import OrderTable from "../components/OrderTable";
import DeliveryTable from "../../deliveries/components/DeliveryTable";

const RequestContainer = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} m={1}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "1rem" }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Commandes
                        </Typography>
                        <OrderTable />
                    </Paper>
                    <Box m={2}>
                        <Button
                            component={Link}
                            to="order/"
                            variant="contained"
                            color="primary"
                        >
                            Nouvelle Commande
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: "1rem" }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Livraisons & Retour
                        </Typography>
                        <DeliveryTable />
                    </Paper>
                    <Box m={2}>
                        <Button
                            component={Link}
                            to="return/"
                            variant="contained"
                            color="primary"
                        >
                            Nouveau Retour
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RequestContainer;
