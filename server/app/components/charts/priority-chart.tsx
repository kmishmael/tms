import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {Chart, ArcElement, CategoryScale, LinearScale, BarElement} from 'chart.js'

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale)
Chart.register(BarElement)

const labels = ["Low", "Medium", "High"];

export type PriorityCount = {
    Low: number;
    Medium: number;
    High: number
}

const barPercentage = 0.5;
const backgroundColor = ["lightgreen", "moccasin", "crimson"];

const options = {
  legend: { display: false },
  maintainAspectRatio: false,
  responsive: false,
  scale: {
    yAxes: [
      {
        "ticks": {
          "beginAtZero": true,
        },
      },
    ],
  },
};


interface Ticket {
  _id: string;
  status: string;
  priority: string;
}

const PriorityChart: React.FC = () => {
  const [, setTickets] = useState<Ticket[]>([]);
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        data: [0, 0, 0],
        barPercentage: barPercentage,
        backgroundColor: backgroundColor,
      },
    ],
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get<Ticket[]>(`${API_URL}/tickets/`)
      .then((res) => {
        const ticketData = res.data;
        setTickets(ticketData);
        const priorityCounts: PriorityCount = { Low: 0, Medium: 0, High: 0 };

        ticketData.forEach((ticket) => {
          if (ticket.status !== "Resolved") {
            priorityCounts[ticket.priority as keyof PriorityCount]++;
          }
        });

        setData({
          labels: labels,
          datasets: [
            {
              data: [
                priorityCounts.Low,
                priorityCounts.Medium,
                priorityCounts.High,
              ],
              barPercentage: barPercentage,
              backgroundColor: backgroundColor,
            },
          ],
        });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Bar data={data} options={options} height={350} width={500} />
    </div>
  );
};

export default PriorityChart;
