import User from "@/dbConfig/models/user.model";
import NextAuth from "next-auth";
import { dbConnection } from "@/dbConfig/dbConnection";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import mongoose from "mongoose";

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/user/login",
  },
  adapter: mongoose,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        try {
          let { email, password } = credentials;
          dbConnection();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const isLogin = await bcrypt.compare(password, user.password);
          if (!isLogin) {
            return null;
          }
          // const obj = {name : user.firstName, lastName: user.lastName, id : user._id.toString(), email} || {}
          // console.log(obj, "inside auth")
          return {
            name: user.firstName,
            email: user.email,
          };
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],

  // callbacks: {
  //   async jwt({token}, user) {
  //     // Additional logic to fetch user data
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       // Add more fields as needed
  //     }
  //     return await token
  //   },
  // },
});

export { handler as GET, handler as POST };
