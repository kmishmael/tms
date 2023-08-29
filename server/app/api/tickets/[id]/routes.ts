import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import Ticket from "@/lib/models/ticket";

export const dynamic = "force-dynamic";

export async function GET(request: Request, {params}: any) {
  try {
    await connectMongo();

    const id = params.id;

    const ticket = await Ticket.find(id);
    let json_response = {
      status: "success",
      data: ticket,
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


export async function DELETE(request: Request, {params}: any) {
    try {
      await connectMongo();

      const id = params.id;

      await Ticket.findByIdAndDelete(id);
      let json_response = {
        status: "success",
        data: 'Ticket deleted.',
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
