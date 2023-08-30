import React, { useState, useEffect } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved"];
const types = ["Bug/Error", "Feature Request", "Security", "Other"];

const CreateTicket: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState(priorities[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [type, setType] = useState(types[0]);
  const [, setUsers] = useState<string[]>([]);
  const [, setProjects] = useState<string[]>([]);
  const API_URL = process.env.API_URL;

  useEffect(() => {
    // Fetch users and set default assignee
    axios
      .get(`${API_URL}/users/`)
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user: { name: string }) => user.name));
          setAssignee(res.data[0].name);
        }
      })
      .catch((error) => console.log(error));

    // Fetch projects and set default project name
    axios
      .get(`${API_URL}/projects`)
      .then((res) => {
        if (res.data.length > 0) {
          setProjects(
            res.data.map((project: { name: string }) => project.name)
          );
          setProjectName(res.data[0].name);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
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
      .post(`${API_URL}/tickets/create`, ticket)
      .then((res) => console.log(res.data));

    alert("Successfully created.");

    // Clear form fields
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");
    setType("");
  };

  return (
    <div>
      {" "}
      <h4 className="uppercase text-normal font-medium mb-4">Submit a Ticket</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            className="form-control mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Description: </label>
          <input
            type="text"
            className="form-control mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Attachment (optional) </label>
          <input
            type="file"
            className="form-control mt-1"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Other form fields... */}
        <div className="form-group mt-4">
          <input
            type="submit"
            value="Submit Ticket"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
