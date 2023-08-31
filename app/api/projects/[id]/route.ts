import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import Project from "@/lib/models/project";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, { params }: any) {
  try {
    await connectMongo();
    const id = params.id;

    await Project.findByIdAndDelete(id);

    let json_response = {
      status: "success",
      data: "Project deleted.",
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
