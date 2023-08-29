import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import Project from "@/lib/models/project";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectMongo();

    const { name } = await request.json();

    const newProject = new Project({ name });

    await newProject.save();

    let json_response = {
      status: "success",
      data: "Project successfully created!",
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
