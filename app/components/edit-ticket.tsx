"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListBox } from "./create-ticket";
import { useToast } from "@/components/ui/use-toast";
import { useOrganization } from "@clerk/nextjs";

export const priorities = ["Low", "Medium", "High"];
export const statuses = ["Open", "In Progress", "Resolved"];
export const types = ["Bug/Error", "Feature Request", "Security", "Other"];

const EditTicket: React.FC<{ id: string }> = ({ id }) => {
  const { toast } = useToast();

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
      toast({
        title: "Ticket Update Successful",
        duration: 2000,
      });
    });
  };

  return (
    <div>
      {" "}
      <p className="uppercase text-normal text-lg font-bold text-gray-700 mb-4">
        Update Ticket
      </p>
      <form onSubmit={onSubmit} className="w-2/5">
        <p className="text-sm mb-2 font-medium">Type </p>
        <div>
          <ListBox selected={type} setSelected={setType} data={types} />
        </div>
        <div className="form-group mt-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {isAdmin && (
          <>
            <p className="text-sm mb-2 font-medium mt-4">Priority </p>
            <div>
              <ListBox
                selected={priority}
                setSelected={setPriority}
                data={priorities}
              />
            </div>

            <p className="text-sm mb-2 font-medium mt-4">Status </p>
            <div>
              <ListBox
                selected={status}
                setSelected={setStatus}
                data={statuses}
              />
            </div>
          </>
        )}

        <div className="form-group mt-4">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
        <div className="form-group mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
          />
        </div>
        <div className="form-group mt-4">
          <button
            type="submit"
            className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit Ticket
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
