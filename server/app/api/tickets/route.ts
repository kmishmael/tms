import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import Ticket from "@/lib/models/ticket";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectMongo();

    const tickets = await Ticket.find();
    let json_response = {
      status: "success",
      data: tickets,
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
