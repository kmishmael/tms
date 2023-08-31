import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import User from "@/lib/models/user";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectMongo();
    const users = User.find();
    let json_response = {
      status: "success",
      data: users,
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
