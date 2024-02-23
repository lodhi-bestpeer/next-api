// pages/index.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to our Website
      </Typography>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Featured Section
              </Typography>
              <Typography>
                This is the featured content of your home page. Highlight something important here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Another Section
              </Typography>
              <Typography>
                You can add more sections and content to showcase different parts of your website.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
