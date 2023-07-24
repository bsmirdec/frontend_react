import React from "react";
import { styled } from "@mui/system";
import { Grid, Box, Typography } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "90vh",
}));

const SquareBox = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: '250px',
              p: 3,
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Box 1
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: '250px',
              p: 3,
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Box 2
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: '250px',
              p: 3,
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Box 3
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: '250px',
              p: 3,
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Box 4
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SquareBox;
