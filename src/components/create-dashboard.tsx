import React from "react";
import StatusChart from "./charts/status-chart";
import PriorityChart from "./charts/priority-chart";
import TypeChart from "./charts/type-chart";
import TicketList from "./ticket-list";

const Dashboard: React.FC = () => {
  return (
    <div>
       {/* <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>
              <h3>Tickets by Status</h3>
            </th>
            <th>
              <h3>Tickets by Priority</h3>
            </th>
            <th>
              <h3>Tickets by Type</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <StatusChart />
            </td>
            <td>
              <PriorityChart />
            </td>
            <td>
              <TypeChart />
            </td>
          </tr>
        </tbody>
      </table>  */}
      <TicketList />
    </div>
  );
};

export default Dashboard;
