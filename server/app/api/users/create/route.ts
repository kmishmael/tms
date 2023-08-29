import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import User from "@/lib/models/user";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectMongo();

    const { name, email, role } = await request.json();

    const newUser = new User({
      name,
      email,
      role,
    });

    await newUser.save();

    let json_response = {
      status: "success",
      data: "User successfully created!",
    };

    return NextResponse.json(json_response, { status: 200 });
  } catch (e) {
    let error_response = {
      status: "fail",
      message: e,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
