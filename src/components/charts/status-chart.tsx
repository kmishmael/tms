import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement, CategoryScale, LinearScale} from 'chart.js'

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale)
Chart.register(ArcElement)

const labels = ['Open', 'In Progress', 'Resolved'];
const backgroundColor = ['gold', 'cornflowerblue', 'darkslategray'];
const options = {
    maintainAspectRatio: false,
    responsive: false,
};

const StatusChart: React.FC = () => {
    const [, setTickets] = useState<any[]>([]);
    const [data, setData] = useState({
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: backgroundColor,
        }],
        labels: labels,
    });

    const updateChartData = (ticketsData: any[]) => {
        let openCount = 0;
        let progressCount = 0;
        let resolvedCount = 0;

        ticketsData.forEach((ticket) => {
            switch (ticket.status) {
                case 'Open':
                    openCount++;
                    break;
                case 'In Progress':
                    progressCount++;
                    break;
                case 'Resolved':
                    resolvedCount++;
                    break;
            }
        });

        setData({
            datasets: [{
                data: [openCount, progressCount, resolvedCount],
                backgroundColor: backgroundColor,
            }],
            labels: labels,
        });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/tickets/')
            .then((res) => {
                setTickets(res.data);
                updateChartData(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <Doughnut
                data={data}
                options={options}
                height={300}
                width={500}
            />
        </div>
    );
};

export default StatusChart;
