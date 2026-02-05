import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const CryptoPieChart = ({ assets }) => {
  if (!assets || assets.length === 0) {
    return <p>Нет данных для графика</p>;
  }

  const data = {
    labels: assets.map(a => a.id.toUpperCase()),
    datasets: [{
      data: assets.map(a => a.totalAmount),
      backgroundColor: [
        '#FF6384', // красный
        '#36A2EB', // синий  
        '#FFCE56', // желтый
        '#4BC0C0', // бирюза
        '#9966FF', // фиолет
        '#FF9F40', // оранж
        '#C9CBCF', // серый
      ],
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `$${value.toFixed(2)}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', margin: '1rem' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CryptoPieChart;