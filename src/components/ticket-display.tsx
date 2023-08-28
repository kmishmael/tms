import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkButton from "./mark-button";

interface TicketProps {
  ticket: {
    _id: string;
    title: string;
    description: string;
    projectName: string;
    assignee: string;
    priority: string;
    status: string;
    type: string;
  };
  deleteTicket: (id: string) => void;
}

const Ticket: React.FC<TicketProps> = ({ ticket, deleteTicket }) => {
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    projectName: "",
    assignee: "",
    priority: "",
    status: "",
    type: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tickets/${ticket._id}`)
      .then((res) => {
        setTicketData({
          title: res.data.title,
          description: res.data.description,
          projectName: res.data.projectName,
          assignee: res.data.assignee,
          priority: res.data.priority,
          status: res.data.status,
          type: res.data.type,
        });
      })
      .catch((error) => console.log(error));
  }, [ticket._id]);

  const getPriorities = (lvl: string) => {
    switch (lvl) {
      case "Low":
        return <td className="low-priority">{lvl}</td>;
      case "Medium":
        return <td className="med-priority">{lvl}</td>;
      case "High":
        return <td className="high-priority">{lvl}</td>;
      default:
        return <td>{lvl}</td>;
    }
  };

  return (
    <tr>
      <td>{ticketData.title}</td>
      <td>{ticketData.description}</td>
      <td>{ticketData.projectName}</td>
      <td>{ticketData.assignee}</td>
      {getPriorities(ticketData.priority)}
      <td>{ticketData.status}</td>
      <td>{ticketData.type}</td>
      <td>
        <Link to={`/edit/${ticket._id}`} className="badge badge-info">
          Edit
        </Link>
        <br />
        <a
          href="#"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this ticket?"))
              deleteTicket(ticket._id);
          }}
          className="badge badge-danger"
        >
          Delete
        </a>
        <br />

        <MarkButton /*mark={ticketData.status} */ _id={ticket._id} />

        {/* Uncomment the following lines to implement status update buttons */}
        {/* {ticketData.status !== 'Resolved' ?
                    <a href="#" onClick={() => {
                        setTicketData(prevData => ({ ...prevData, status: 'Resolved' }));
                    }}
                        className="badge badge-success">Mark as Resolved</a> :
                    <a href="#" onClick={() => {
                        setTicketData(prevData => ({ ...prevData, status: 'Open' }));
                    }}
                        className="badge badge-secondary">Mark as Open</a>
                } */}
      </td>
    </tr>
  );
};

export default Ticket;
