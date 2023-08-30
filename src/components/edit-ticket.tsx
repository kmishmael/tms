import React, { useState, useEffect } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved"];
const types = ["Bug/Error", "Feature Request", "Security", "Other"];

const EditTicket: React.FC<any> = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    // Fetch ticket data and set initial state
    axios
      .get(`${API_URL}/tickets/${props.match.params.id}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
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

    // Fetch users for assignee selection
    axios
      .get(`${API_URL}/users/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user: any) => user.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch projects for project selection
    axios
      .get(`${API_URL}/projects/`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setProjects(res.data.map((project: any) => project.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticket = {
      title,
      description,
      projectName,
      assignee,
      priority,
      status,
      type,
    };

    axios
      .post(`${API_URL}/tickets/update/${props.match.params.id}`, ticket, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });

    alert("Successfully updated.");
  };

  return (
    <div>
      <h3>Edit Ticket</h3>
      <form onSubmit={onSubmit}>{/* Form input fields */}</form>
    </div>
  );
};

export default EditTicket;
