import { NextResponse } from "next/server";
import User from "@/dbConfig/models/user.model";
import { dbConnection } from "@/dbConfig/dbConnection";
dbConnection()

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const data = await User.findOne({ _id: id });
    return NextResponse.json(data, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deleteUser = User.deleteOne({ _id: id });
    return NextResponse.json(deleteUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const deleteUser = await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return NextResponse.json(deleteUser, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
