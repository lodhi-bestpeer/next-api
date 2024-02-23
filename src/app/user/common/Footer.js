// Footer.js
import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const Footer = () => {
  return (
    <Paper elevation={3} style={{ width: '100%',  position: 'fixed', bottom: 0, padding:"20px" }}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Your Website Name. All rights reserved.
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
