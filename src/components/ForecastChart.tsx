import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineChart } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ForecastChartProps {
  data: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weathercode: number[];
  };
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  if (!data || !data.time || data.time.length === 0) return null;
  console.log(data);

  // Prepare chart data for Open-Meteo format
  const chartData = {
    labels: data.time,
    datasets: [
      {
        label: 'Max Temp (°C)',
        data: data.temperature_2m_max,
        borderColor: '#f59e42',
        backgroundColor: 'rgba(245, 158, 66, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Min Temp (°C)',
        data: data.temperature_2m_min,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y}°C`;
          }
        }
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(226, 232, 240, 0.5)',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg weather-card">
      <div className="flex items-center mb-4">
        <LineChart size={20} className="mr-2 text-blue-600" />
        <h3 className="text-xl font-semibold">7-Day Temperature Forecast</h3>
      </div>
      <div className="h-80">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ForecastChart;