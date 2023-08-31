import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkButton from "./mark-button";
import { Dialog, Transition } from "@headlessui/react";
import { useOrganization } from "@clerk/clerk-react";
import { ListBox, Priority, Status } from "./create-ticket";
import { priorities, statuses } from "./edit-ticket";

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
    priority: "",
    status: "",
    type: "",
  });
  let [isOpen, setIsOpen] = useState(false);
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

  function closeModal(id: any) {
    deleteTicket(id);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const API_URL = process.env.API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/tickets/${ticket._id}`)
      .then((res) => {
        setTicketData({
          _id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          author: res.data.author,
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

  return (
    <>
      {isAdmin ? (
        <>
          {/*@ts-expect-error */}
          <tr className="py-2 text-sm" valign="middle">
            <td>{ticketData.type}</td>
            <td>{ticketData.title}</td>
            {/* <td>{new Date().toDateString()}</td> */}
            <td>{ticketData.assignee}</td>
            {/* {getPriorities(ticketData.priority)} */}

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
                <Link to={`/tickets/edit/${ticketData._id}`}>
                  <button className="border h-[37px] px-4 py-1.5 rounded-lg bg-blue-600 text-white">
                    VIEW
                  </button>
                </Link>
                {/* <button className="border px-2 py-1.5 rounded-lg bg-red-600 text-white">DELETE</button> */}
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

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={() => closeModal(ticketData._id)}
                                >
                                  Yeah
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

            {/* <td>
        <Link to={`/edit/${ticket._id}`} className="">
          Edit
        </Link>
        <br />
        <a
          href="#"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this ticket?"))
              deleteTicket(ticket._id);
          }}
          className=""
        >
          Delete
        </a>
        <br />

        <MarkButton _id={ticket._id} />

      </td> */}
          </tr>
        </>
      ) : (
        <>
          {/*@ts-expect-error */}
          <tr className="py-2 text-sm" valign="middle">
            <td>{ticketData.type}</td>
            <td>{ticketData.title}</td>
            <td>{new Date().toDateString()}</td>
            {/* {getPriorities(ticketData.priority)} */}
            <td>{ticketData.status}</td>

            <td>
              <div className="flex gap-3 text-xs">
                <Link to={`/tickets/edit/${ticketData._id}`}>
                  <button className="border h-[37px] px-4 py-1.5 rounded-lg bg-blue-600 text-white">
                    VIEW
                  </button>
                </Link>
                {/* <button className="border px-2 py-1.5 rounded-lg bg-red-600 text-white">DELETE</button> */}
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

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={() => closeModal(ticketData._id)}
                                >
                                  Yeah
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

            {/* <td>
        <Link to={`/edit/${ticket._id}`} className="">
          Edit
        </Link>
        <br />
        <a
          href="#"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this ticket?"))
              deleteTicket(ticket._id);
          }}
          className=""
        >
          Delete
        </a>
        <br />

        <MarkButton _id={ticket._id} />


      </td> */}
          </tr>
        </>
      )}
    </>
  );
};

export default Ticket;
