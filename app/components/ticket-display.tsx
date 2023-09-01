"use client";

import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { Priority, Status } from "./create-ticket";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BiLink } from "react-icons/bi";

import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
  const [ticketData, setTicketData] = useState<{
    _id?: string;
    title: string;
    description: string;
    author: string;
    date: string;
    assignee: string;
    priority: string;
    status: string;
    type: string;
  }>({
    _id: "",
    title: "",
    description: "",
    author: "",
    assignee: "",
    date: "",
    priority: "",
    status: "",
    type: "",
  });
  let [isOpen, setIsOpen] = useState(false);

  const { isLoaded, user } = useUser();

  const isAdmin =
    isLoaded && user && user.organizationMemberships[0].role == "admin";

  function closeModal(id: any) {
    deleteTicket(id);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/tickets/${ticket._id}`)
      .then((res) => {
        setTicketData({
          _id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          author: res.data.author,
          date: res.data.date,
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
        return <td className="">{lvl}</td>;
      case "Medium":
        return <td className="">{lvl}</td>;
      case "High":
        return <td className="">{lvl}</td>;
      default:
        return <td>{lvl}</td>;
    }
  };

  useEffect(() => {
    if (ticketData._id && ticketData._id.length > 0) {
      updateTicket();
    }
  }, [ticketData]);

  const updateTicket = async () => {
    let updateData = { ...ticketData };
    delete updateData["_id"];
    await axios.post(`${API_URL}/tickets/update/${ticketData._id}`, updateData);
  };

  function setNewPriority(p: Priority) {
    const n = { ...ticketData };
    n.priority = p;
    setTicketData(n);
  }

  function setNewStatus(p: Status) {
    const n = { ...ticketData };
    n.status = p;
    setTicketData(n);
  }

  function getP(p: Priority){
    if (p == 'High') {
      return 'bg-red-600'
    }
    else if (p == 'Medium') {
      return 'bg-green-500'
    }
    else if (p == 'Low') {
      return 'bg-green-600'
    }
    return 'bg-yellow-600'
  }

  function getS(p: Status){
    if (p == 'Open') {
      return 'bg-gray-600'
    }
    else if (p == 'In Progress') {
      return 'bg-yellow-600'
    }
    else if (p == 'Resolved') {
      return 'bg-green-600'
    }
  }

  return (
    <>
      {isAdmin ? (
        <>
          <div className="flex p-2 border-y justify-between h-16">
            <div className="flex flex-col">
              <p className="font-bold text-gray-700 text-md">
                {ticketData.title}
              </p>
              <div className="flex gap-1 mt-1 items-center">
                <BiLink className="h-3 w-3" />
                <p className="text-sm">{ticketData.type}</p>
                <div className="flex items-center">
                  <span className="mx-2 h-1 w-1 bg-black rounded-full"> </span>
                  <p className="text-sm">7 mins ago</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className={`mr-6 flex items-center `}>
                <button className={`text-center h-8 p-1 w-[70px] font-medium text-white rounded-lg items-center ${getP(ticketData.priority as Priority)}`}>
                {ticketData.priority}
                </button>
              </div>
              <div className={`mr-6 flex items-center `}>
                <button className={`text-center h-8 p-1 w-[70px] font-medium text-white rounded-lg items-center ${getS(ticketData.status as Status)}`}>
                {ticketData.status}
                </button>
              </div>
              <Link href={`/tickets/edit/${ticketData._id}`}>
                <button className="border h-[37px] px-4 py-1.5 rounded-lg bg-blue-600 text-white">
                  VIEW
                </button>
              </Link>
              <>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Delete
                  </button>
                </div>

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Delete Ticket
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this ticket?
                              </p>
                            </div>

                            <div className="mt-4 text-right">
                              <button
                                type="button"
                                className="inline-flex ml-auto mr-4 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => closeModal(ticketData._id)}
                              >
                                Proceed
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </>
            </div>
          </div>

          {/* <tr className="py-2 text-sm" valign="middle">
            <td>{ticketData.type}</td>
            <td>{ticketData.title}</td>
            <td>{ticketData.assignee}</td>

            <td className="text-sm w-32">
              <ListBox
                selected={ticketData.priority}
                setSelected={setNewPriority}
                data={priorities}
              />
            </td>

            <td className="text-sm w-40">
              <ListBox
                selected={ticketData.status}
                setSelected={setNewStatus}
                data={statuses}
              />
            </td>

            <td>
              <div className="flex gap-3 text-xs">
                <Link href={`/tickets/edit/${ticketData._id}`}>
                  <button className="border h-[37px] px-4 py-1.5 rounded-lg bg-blue-600 text-white">
                    VIEW
                  </button>
                </Link>
                <>
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={openModal}
                      className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                      Delete
                    </button>
                  </div>

                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-10"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Delete Ticket
                              </Dialog.Title>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to delete this ticket?
                                </p>
                              </div>

                              <div className="mt-4 text-right">
                                <button
                                  type="button"
                                  className="inline-flex ml-auto mr-4 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={() => closeModal(ticketData._id)}
                                >
                                  Proceed
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              </div>
            </td>

          </tr> */}
        </>
      ) : (
        <>
          <div className="flex p-2 border-y justify-between h-16">
            <div className="flex flex-col">
              <p className="font-bold text-gray-700 text-md">
                {ticketData.title}
              </p>
              <div className="flex gap-1 mt-1 items-center">
                <BiLink className="h-3 w-3" />
                <p className="text-sm">{ticketData.type}</p>
                <div className="flex items-center">
                  <span className="mx-2 h-1 w-1 bg-black rounded-full"> </span>
                  <p className="text-sm">2 days ago</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className={`mr-6 flex items-center `}>
                <button className={`text-center h-8 p-1 w-[70px] font-medium text-white rounded-lg items-center ${getP(ticketData.priority as Priority)}`}>
                {ticketData.priority}
                </button>
              </div>
              <div className={`mr-6 flex items-center `}>
                <button className={`text-center h-8 p-1 w-[70px] font-medium text-white rounded-lg items-center ${getS(ticketData.status as Status)}`}>
                {ticketData.status}
                </button>
              </div>
              <Link href={`/tickets/edit/${ticketData._id}`}>
                <button className="border h-[37px] px-4 py-1.5 rounded-lg bg-blue-600 text-white">
                  VIEW
                </button>
              </Link>
              <>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Delete
                  </button>
                </div>

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Delete Ticket
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this ticket?
                              </p>
                            </div>

                            <div className="mt-4 text-right">
                              <button
                                type="button"
                                className="inline-flex ml-auto mr-4 justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => closeModal(ticketData._id)}
                              >
                                Proceed
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Ticket;

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
    icon: IconOne,
  },
  {
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
    icon: IconTwo,
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
    icon: IconThree,
  },
];

function ViewMore() {
  return (
    <div className="fixed top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Solutions</span>
              <ChevronDownIcon
                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4">
                    <a
                      href="##"
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  );
}
