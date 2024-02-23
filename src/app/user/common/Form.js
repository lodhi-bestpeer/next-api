import { Button } from "@mui/material";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Form = () => {
  const logOut = async () => {
    // await signOut({
    //   callbackUrl: "/user/login", // Specify the URL you want to redirect to after signing out
    // });
    await signOut()
  };

  return (
    <Button color="inherit" onClick={logOut}>
      {/* <Link
        href="/user/login"
        style={{ color: "inherit", textDecoration: "none" }}
      > */}
        Log out
      {/* </Link> */}
    </Button>
  );
};

export default Form;
