/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListBox } from "./create-ticket";
import { useParams, useSearchParams } from "react-router-dom";

export const priorities = ["Low", "Medium", "High"];
export const statuses = ["Open", "In Progress", "Resolved"];
export const types = ["Bug/Error", "Feature Request", "Security", "Other"];

const EditTicket: React.FC<any> = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch ticket data and set initial state
    axios
      .get(`${API_URL}/tickets/${id}`)
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
      .get(`${API_URL}/users/`)
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
      .get(`${API_URL}/projects/`)
      .then((res) => {
        if (res.data.length > 0) {
          setProjects(res.data.map((project: any) => project.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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

    axios.post(`${API_URL}/tickets/update/${id}`, ticket).then((res) => {
      console.log(res.data);
    });

  };

  return (
    <div>
      {" "}
      <p className="uppercase text-normal text-lg font-bold text-gray-700 mb-4">
        Update Ticket
      </p>
      <form onSubmit={onSubmit}>
        <label>Type </label>
        <br />
        <ListBox selected={type} setSelected={setType} data={types} />
        <div className="form-group mt-4">
          <label>Title </label>
          <input
            type="text"
            className="form-control mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Description </label>
          <textarea
            className="form-control mt-1 h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Attachment (optional) </label>
          <input type="file" className="form-control mt-1" />
        </div>
       
        <div className="form-group mt-4">
          <input
            type="submit"
            value="Update Ticket"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
*/