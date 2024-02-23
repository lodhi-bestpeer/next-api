import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, errorMessage: "File is Empty" },
        { status: 404 }
      );
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/${file.name}`;
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    return NextResponse.json(
      { message: "Image uploaded successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { errorMessage: error.message, success: false },
      { status: 500 }
    );
  }
}
