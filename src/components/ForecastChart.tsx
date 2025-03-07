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
import { ForecastData } from '../types/weather';
import { getTemperatureChartData } from '../utils/weatherUtils';
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
  data: ForecastData;
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  if (!data || !data.list || data.list.length === 0) return null;

  const chartData = getTemperatureChartData(data.list);

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
            return `Temperature: ${context.parsed.y}°C`;
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
          text: 'Time',
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
        <h3 className="text-xl font-semibold">24-Hour Temperature Forecast</h3>
      </div>
      <div className="h-80">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ForecastChart;