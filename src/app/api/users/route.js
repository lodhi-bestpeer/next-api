import { NextResponse } from "next/server";
import User from "@/dbConfig/models/user.model";
import { dbConnection } from "@/dbConfig/dbConnection";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
dbConnection();

export async function GET(_) {
  try {
    const user = await User.find({});
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  if (!body.firstName && body.email && body.password) {
    return loginUser(request, body);
  } else if (body.firstName) {
    return registerUser(request, body);
  }
}

async function registerUser(_, body) {
  try {
    const { email, firstName, lastName, password } = body;
    const user = await User.create({
      email,
      firstName,
      lastName,
      password
    });
    return NextResponse.json({success : true, message : "signup successfully"}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function loginUser(_, body) {
  try {
    const { email, password } = body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return NextResponse.json(
        {
          success: false,
          errorMessage:
            "No account found. Please register before attempting to login.",
        },
        { status: 404 }
      );
    }

    const isLogin = await bcrypt.compare(password, findUser.password);
    if (!isLogin) {
      return NextResponse.json(
        {
          success: false,
          errorMessage: "Invalid credentials",
        },
        { status: 404 }
      );
    }

    const { firstName, lastName } = findUser || {};
    const token = jwt.sign({ email }, "shhhhh")
    const user = {firstName, lastName, email, token  };
    const userProfile = {
      success: true,
      message: "login successfully",
      data: user
    };
    return NextResponse.json(userProfile, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
