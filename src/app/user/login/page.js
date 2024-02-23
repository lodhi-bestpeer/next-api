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
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux"; 
import { addUser } from "@/app/redux/slice";

import { signIn } from  "next-auth/react"

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // const myState = useSelector((state)=> state.userSlice)
  // console.log("myState", myState)

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
    try {
      const { email, password } = values;
      
     const response =  await signIn("credentials",{
      email: email,
      password: password,
      redirect: false
     })

     console.log(response, "response")


      if (response.status === 200) {
        // let response = await fetch("/api/users/", {
        //   method: "post",
        //   body: JSON.stringify({ email, password }),
        // });
        // localStorage.setItem('authToken', JSON.stringify(response.data.token));
        // dispatch(addUser(response.data))
       return router.push("/user/dashboard");
      }
      else{
        alert("Invalid credential")
      }
    } catch (error) {
      console.log(error, "error");
    }

    setValues({
      email: "",
      password: "",
      showPassword: false,
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
        marginTop: "200px",
      }}
    >
      <CssBaseline />
      <div style={{ width: "100%" }}>
        <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "20px", width: "100%" }}
        >
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
          You have not an account? <Link href="/user/signup">Signup</Link>
        </Typography>
      </div>
    </Container>
  );
};

export default Login;
