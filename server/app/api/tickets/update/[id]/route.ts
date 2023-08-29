import { NextResponse } from "next/server";
import connectMongo from "@/lib/config";
import Ticket from "@/lib/models/ticket";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: any) {
  try {
    await connectMongo();

    const id = params.id;

    const {
      title,
      description,
      projectName,
      assignee,
      priority,
      status,
      type,
    } = await request.json();

    const ticket = await Ticket.findById(id);

    ticket.title = title
    ticket.description = description
    ticket.projectName = projectName
    ticket.assignee = assignee
    ticket.priority = priority
    ticket.status = status
    ticket.type = type

    await ticket.save()

    let json_response = {
      status: "success",
      data: 'Ticket updated',
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
