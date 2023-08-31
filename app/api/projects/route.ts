import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import Project from "@/lib/models/project";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectMongo();

    const projects = await Project.find();
    let json_response = {
      status: "success",
      data: projects,
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
