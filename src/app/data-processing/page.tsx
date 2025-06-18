'use client'

import { Card, Title, Text } from '@tremor/react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js'
import {
  DocumentTextIcon,
  ChartBarIcon,
  CogIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
)

const metrics = [
  {
    title: 'Total Datasets',
    value: '24',
    change: '+3 new this week',
    trend: 'up'
  },
  {
    title: 'Processed Items',
    value: '1.2M',
    change: '+150K today',
    trend: 'up'
  },
  {
    title: 'Success Rate',
    value: '98.5%',
    change: '+0.5% from last week',
    trend: 'up'
  },
  {
    title: 'Avg. Processing Time',
    value: '45s',
    change: '-5s optimization',
    trend: 'up'
  }
]

const processingData = {
  labels: ['Text', 'Images', 'Audio', 'Video', 'Structured'],
  datasets: [
    {
      label: 'Processing Volume',
      data: [450, 300, 200, 150, 100],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
      ],
    },
  ],
}

export default function DataProcessing() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold rgb-text">Data Processing</h1>
          <p className="text-gray-400">Monitor and manage data processing pipelines</p>
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
            <div className={`flex items-center mt-2 ${
              metric.trend === 'up' ? 'text-green-400' : 
              metric.trend === 'down' ? 'text-red-400' : 
              'text-gray-400'
            }`}>
              <span className="text-sm">{metric.change}</span>
              {metric.trend === 'up' && (
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              )}
              {metric.trend === 'down' && (
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4">
            Processing Distribution
          </Title>
          <div className="h-80">
            <Bar
              data={processingData}
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

        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4">
            Active Pipelines
          </Title>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <DocumentTextIcon className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <Text className="text-gray-400">Text Processing</Text>
                  <div className="w-48 bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
              <Text className="text-gray-400">75%</Text>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <ChartBarIcon className="w-6 h-6 text-purple-500 mr-3" />
                <div>
                  <Text className="text-gray-400">Image Analysis</Text>
                  <div className="w-48 bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              <Text className="text-gray-400">45%</Text>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <CogIcon className="w-6 h-6 text-pink-500 mr-3" />
                <div>
                  <Text className="text-gray-400">Audio Processing</Text>
                  <div className="w-48 bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
              <Text className="text-gray-400">90%</Text>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <ClockIcon className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <Text className="text-gray-400">Video Analysis</Text>
                  <div className="w-48 bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <Text className="text-gray-400">60%</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 