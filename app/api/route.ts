import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    let json_response = {
      status: "success",
      data: "TMS API",
    };

    return NextResponse.json(json_response.data , { status: 200 });
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
