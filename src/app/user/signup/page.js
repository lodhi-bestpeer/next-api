"use client";
import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, password, email } = values;

    let response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({ firstName, lastName, password, email }),
    });
    response = await response.json();

    if (response.success) {
      router.push("/user/login");
    }
    setValues({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "150px",
      }}
    >
      <CssBaseline />
      <div style={{ width: "100%" }}>
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Sign Up
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "20px", width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="off"
            autoFocus
            value={values.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="off"
            autoFocus
            value={values.lastName}
            onChange={handleChange("lastName")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange("email")}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
        </form>
        <Typography style={{ marginTop: "20px" }}>
          Already have an account? <Link href="/user/login">Login</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Signup;
