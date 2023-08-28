import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const labels = ['Low', 'Medium', 'High'];
const barPercentage = 0.5;
const backgroundColor = ['lightgreen', 'moccasin', 'crimson'];
const options = {
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
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
    const [tickets, setTickets] = useState<Ticket[]>([]);
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

    useEffect(() => {
        axios.get<Ticket[]>('http://localhost:5000/tickets/')
            .then(res => {
                const ticketData = res.data;
                setTickets(ticketData);
                const priorityCounts = { Low: 0, Medium: 0, High: 0 };

                ticketData.forEach(ticket => {
                    if (ticket.status !== 'Resolved') {
                        priorityCounts[ticket.priority]++;
                    }
                });

                setData({
                    labels: labels,
                    datasets: [
                        {
                            data: [priorityCounts.Low, priorityCounts.Medium, priorityCounts.High],
                            barPercentage: barPercentage,
                            backgroundColor: backgroundColor,
                        },
                    ],
                });
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <Bar data={data} options={options} height={350} width={500} />
        </div>
    );
};

export default PriorityChart;
