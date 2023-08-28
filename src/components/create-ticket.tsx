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

  useEffect(() => {
    // Fetch users and set default assignee
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user: { name: string }) => user.name));
          setAssignee(res.data[0].name);
        }
      })
      .catch((error) => console.log(error));

    // Fetch projects and set default project name
    axios
      .get("http://localhost:5000/projects/")
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
      .post("http://localhost:5000/tickets/create", ticket)
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
      <h3>Submit a Ticket</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Other form fields... */}
        <div className="form-group">
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
