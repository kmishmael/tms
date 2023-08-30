import React, { useEffect, useState } from "react";
import axios from "axios";
import Ticket from "./ticket-display";
import { Link } from "react-router-dom";

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
  const API_URL = process.env.API_URL;

  useEffect(() => {
    // fetch(`${API_URL}/tickets/`, {method: 'no-cors'})
    //   .then(async (data) => {
    //     console.log(data)
    //     data.json().then((d) => {
    //       setTickets(d);
    //     });
    //   })
    //   .catch((error) => console.log(error));
    axios
      .get<Ticket[]>(`${API_URL}/tickets/`)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
    <div>
      <br />
      <div className="flex justify-between">
        <p className="text-lg font-semibold uppercase">Tickets</p>
        <Link to={'/tickets/create'}>
        <button className="px-2 py-1.5 bg-blue-600 text-white rounded-md mr-8 hover:bg-blue-800">
            Create ticket
        </button>
        </Link>
      </div>
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
