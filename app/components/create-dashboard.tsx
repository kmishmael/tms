"use client";
import React from "react";
// import StatusChart from "./charts/status-chart";
// import PriorityChart from "./charts/priority-chart";
// import TypeChart from "./charts/type-chart";
import TicketList from "./ticket-list";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

const Dashboard: React.FC = () => {
  const { isLoaded, organization, invitationList, membershipList, membership } =
    useOrganization({
      membershipList: {},
    });

  return (
    <div className="w-full">
      <TicketList />
    </div>
  );
};

export default Dashboard;
