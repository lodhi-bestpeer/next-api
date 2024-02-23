"use client";

import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import Form from "./Form"


const Header = () => {
  const { data: session  } = useSession();
  const user = session?.user || null;
  // console.log(session?.user, "session")
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            NextJS App
          </Link>
        </Typography>

        {user ? (
          <div>
            <Button color="inherit">
              <Link
                href="/user/dashboard"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Dashboard
              </Link>
            </Button>
            <Form/>
          </div>
        ) : (
          <div>
            <Button color="inherit">
              <Link
                href="/user/signup"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Sign Up
              </Link>
            </Button>
            <Button color="inherit">
              <Link
                href="/user/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Log In
              </Link>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
