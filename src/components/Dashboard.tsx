'use client'

import { Card, Title, Text } from '@tremor/react'
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
)

const metrics = [
  {
    title: 'Model Accuracy',
    value: '98.5%',
    change: '+2.3%',
    trend: 'up',
  },
  {
    title: 'Processing Time',
    value: '0.8s',
    change: '-0.2s',
    trend: 'down',
  },
  {
    title: 'Active Users',
    value: '1,234',
    change: '+12%',
    trend: 'up',
  },
  {
    title: 'Success Rate',
    value: '99.9%',
    change: '+0.1%',
    trend: 'up',
  },
]

const accuracyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Training Accuracy',
      data: [85, 88, 92, 94, 96, 98.5],
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Validation Accuracy',
      data: [82, 85, 89, 91, 93, 96],
      borderColor: 'rgb(236, 72, 153)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
    },
  ],
}

const systemData = {
  labels: ['CPU', 'Memory', 'GPU', 'Storage'],
  datasets: [
    {
      label: 'Usage',
      data: [65, 45, 80, 30],
      backgroundColor: [
        'rgba(99, 102, 241, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
    },
  ],
}

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold rgb-text">Dashboard</h1>
          <p className="text-gray-400">Welcome to your AI Platform dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className="rgb-border bg-gray-900 hover:scale-105 transition-transform duration-300"
          >
            <Text className="text-gray-400">{metric.title}</Text>
            <Title className="text-2xl font-bold text-white mt-2">
              {metric.value}
            </Title>
            <div
              className={`flex items-center mt-2 ${
                metric.trend === 'up'
                  ? 'text-green-400'
                  : metric.trend === 'down'
                  ? 'text-red-400'
                  : 'text-gray-400'
              }`}
            >
              <span className="text-sm">{metric.change}</span>
              {metric.trend === 'up' && (
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              )}
              {metric.trend === 'down' && (
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4">
            Accuracy Trends
          </Title>
          <div className="h-80">
            <Line
              data={accuracyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#9CA3AF',
                    },
                  },
                },
                scales: {
                  y: {
                    grid: {
                      color: 'rgba(75, 85, 99, 0.2)',
                    },
                    ticks: {
                      color: '#9CA3AF',
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(75, 85, 99, 0.2)',
                    },
                    ticks: {
                      color: '#9CA3AF',
                    },
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4">
            System Status
          </Title>
          <div className="h-80">
            <Bar
              data={systemData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    grid: {
                      color: 'rgba(75, 85, 99, 0.2)',
                    },
                    ticks: {
                      color: '#9CA3AF',
                    },
                  },
                  x: {
                    grid: {
                      color: 'rgba(75, 85, 99, 0.2)',
                    },
                    ticks: {
                      color: '#9CA3AF',
                    },
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  )
} 