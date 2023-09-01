"use client";

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
//import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast"

const priorities: Priority[] = ["Low", "Medium", "High"];
const statuses: Status[] = ["Open", "In Progress", "Resolved"];
const types: Type[] = [
  "Service Request",
  "Change Request",
  "Incident",
  "Problem",
];

export type Priority = "Low" | "Medium" | "High" | "Not Set";
export type Status = "Open" | "In Progress" | "Resolved";
type Type = "Service Request" | "Change Request" | "Incident" | "Problem";

const CreateTicket: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  //const { user } = useUser();
  const { user, isLoaded } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState();
  const [priority, setPriority] = useState<Priority | null>(priorities[0]);
  const [status, setStatus] = useState<Status | null>(statuses[0]);
  const [type, setType] = useState<Type | null>(types[0]);
  const [, setUsers] = useState<string[]>([]);
  const [, setProjects] = useState<string[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      assignee: "Not Set",
      author: user?.id,
      priority: "Not Set",
      status: "Open",
      type,
    };

    axios.post(`${API_URL}/tickets/create`, ticket).then((res) => {
      console.log(res.data);
      toast({
        title: 'Ticket Created Successfully',
        description: 'Redirecting...'
      })

      axios.post(`/api/send`, {title: title, description: description, email: user?.primaryEmailAddress?.emailAddress}).then((res) => {
       //
       console.log(res)
      })
      router.push('/dashboard')
    });

    // Clear form fields
    setTitle("");
    setDescription("");
    setPriority(priorities[0]);
    setStatus(statuses[0]);
    setType(types[0]);
  };

  return (
    <div>
      {" "}
      <p className="uppercase text-normal text-lg font-bold text-gray-700 mb-4">
        Submit a Ticket
      </p>
      <form onSubmit={handleSubmit} className="w-2/5">
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

export default CreateTicket;

export function ListBox({ selected, setSelected, data }: any) {
  return (
    <div className="w-full mt-1">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative border border-neutral-400 duration-100 transition-[border] focus:border-blue-500 min-h-[41px] w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-[1000] mt-1 p-0 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((d: any, dIdx: any) => (
                <Listbox.Option
                  key={dIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                  value={d}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {d}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
