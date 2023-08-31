import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TicketProps {
  _id: string;
}

const MarkButton: React.FC<TicketProps> = ({ _id }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [, setUsers] = useState<string[]>([]);
  const [, setProjects] = useState<string[]>([]);
  const API_URL = process.env.API_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/tickets/${_id}`)
      .then((res) => {
        const ticketData = res.data;
        setTitle(ticketData.title);
        setDescription(ticketData.description);
        setProjectName(ticketData.projectName);
        setAssignee(ticketData.assignee);
        setPriority(ticketData.priority);
        setStatus(ticketData.status);
        setType(ticketData.type);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/users/`)
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user: any) => user.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}/projects/`)
      .then((res) => {
        if (res.data.length > 0) {
          setProjects(res.data.map((project: any) => project.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [_id]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    setStatus(status !== 'Resolved' ? 'Resolved' : 'Open');

    const updatedTicket = {
      title,
      description,
      projectName,
      assignee,
      priority,
      status,
      type,
    };

    axios
      .post(`${API_URL}/tickets/update/${_id}`, updatedTicket)
      .then((res) => console.log(res.data));

  };

  return (
    <div>
      {status !== 'Resolved' ? (
        <a
          href="#"
          onClick={handleClick}
          className=""
        >
          Mark as Resolved
        </a>
      ) : (
        <a
          href="#"
          onClick={handleClick}
          className=""
        >
          Mark as Open
        </a>
      )}
    </div>
  );
};

export default MarkButton;
