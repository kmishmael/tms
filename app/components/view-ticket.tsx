import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { useUser } from "@clerk/clerk-react";

const priorities: Priority[] = ["Low", "Medium", "High"];
const statuses: Status[] = ["Open", "In Progress", "Resolved"];
const types: Type[] = ["Bug/Error", "Feature Request", "Security", "Other"];

type Priority = "Low" | "Medium" | "High" | "Not Set";
type Status = "Open" | "In Progress" | "Resolved";
type Type = "Bug/Error" | "Feature Request" | "Security" | "Other";

const CreateTicket: React.FC = () => {
  const { user } = useUser()
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


    axios
      .post(`${API_URL}/tickets/create`, ticket)
      .then((res) => console.log(res.data));


    // Clear form fields
    setTitle("");
    setDescription("");
    setPriority(null);
    setStatus(null);
    setType(null);
  };

  return (
    <div>
      {" "}
      <p className="uppercase text-normal text-lg font-bold text-gray-700 mb-4">
        Submit a Ticket
      </p>
      <form onSubmit={handleSubmit}>
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
          <input
            type="file"
            className="form-control mt-1"
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

export function ListBox({ selected, setSelected, data }: any) {
  return (
    <div className="w-full mt-1">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative border border-neutral-800 w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
            <Listbox.Options className="absolute mt-1 p-0 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
