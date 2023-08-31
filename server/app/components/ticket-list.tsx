'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./ticket-display";
import { useOrganization, useUser } from "@clerk/nextjs";
import Link from 'next/link';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  projectName: string;
  assignee: string;
  priority: string;
  status: string;
  type: string;
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { user, isLoaded } = useUser();
  const {
    isLoaded: orgloaded,
    organization,
    invitationList,
    membershipList,
    membership,
  } = useOrganization({
    membershipList: {},
  });

  const isAdmin = orgloaded && membership?.role == "admin";

  useEffect(() => {
    // fetch(`${API_URL}/tickets/`, {method: 'no-cors'})
    //   .then(async (data) => {
    //     console.log(data)
    //     data.json().then((d) => {
    //       setTickets(d);
    //     });
    //   })
    //   .catch((error) => console.log(error));
    if (!isLoaded) return;
    if (!isAdmin) {
    axios
      .get<Ticket[]>(`${API_URL}/tickets`, {
        params: { user: user?.id.toUpperCase() },
      })
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => console.log(error));
    } else {
        axios
      .get<Ticket[]>(`${API_URL}/tickets`)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => console.log(error));
    }
  }, [isLoaded]);

  const deleteTicket = (id: string) => {
    axios.delete(`${API_URL}/tickets/${id}`).then((res) => {
      console.log(res.data);
    });

    setTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket._id !== id)
    );
  };

  const getOpenList = () => {
    return tickets.map((currentTicket) => {
      if (currentTicket.status !== "Resolved") {
        return (
          <Ticket
            ticket={currentTicket}
            deleteTicket={deleteTicket}
            key={currentTicket._id}
          />
        );
      }
      return null;
    });
  };

  const getResolvedList = () => {
    return tickets.map((currentTicket) => {
      if (currentTicket.status === "Resolved") {
        return (
          <Ticket
            ticket={currentTicket}
            deleteTicket={deleteTicket}
            key={currentTicket._id}
          />
        );
      }
      return null;
    });
  };

  return (
    <div className="w-full">
      <br />
      <div className="flex justify-between">
        <p className="text-lg font-semibold uppercase">Tickets</p>
        <Link href={"/tickets/create"}>
          <button className="px-2 py-1.5 bg-blue-600 text-white rounded-md mr-8 hover:bg-blue-800">
            Create ticket
          </button>
        </Link>
      </div>
      <table className="table mt-6">
        <thead className="font-normal">
          {isAdmin ? (
            <tr>
              <th className="font-medium text-sm uppercase">Category</th>
              <th className="font-medium text-sm uppercase">Title</th>
              {/* <th className="font-medium text-sm uppercase">WHEN</th> */}
              <th className="font-medium text-sm uppercase">Asigned To</th>
              <th className="font-medium text-sm uppercase">Priority</th>
              <th className="font-medium text-sm uppercase">Status</th>
              <th className="font-medium text-sm uppercase">Actions</th>
            </tr>
          ) : (
            <tr>
              <th className="font-medium text-sm uppercase">Category</th>
              <th className="font-medium text-sm uppercase">Title</th>
              <th className="font-medium text-sm uppercase">WHEN</th>
              {/* <th className="font-medium text-sm uppercase">Priority</th> */}
              <th className="font-medium text-sm uppercase">Status</th>
              <th className="font-medium text-sm uppercase">Actions</th>
            </tr>
          )}
        </thead>
        <tbody>{getOpenList()}</tbody>
      </table>
      <br />
      {/*
      <h3>Resolved Tickets</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Project</th>
            <th>Assigned To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{getResolvedList()}</tbody>
      </table> */}
    </div>
  );
};

export default TicketList;
