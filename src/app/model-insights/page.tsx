'use client'

import { Card, Title, Text } from '@tremor/react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
)

const metrics = [
  {
    title: 'Model Accuracy',
    value: '96.5%',
    change: '+2.3% from last month',
    trend: 'up'
  },
  {
    title: 'Training Progress',
    value: '85%',
    change: '3 models in training',
    trend: 'neutral'
  },
  {
    title: 'Inference Speed',
    value: '45ms',
    change: '-5ms from last week',
    trend: 'up'
  },
  {
    title: 'Model Size',
    value: '2.4GB',
    change: 'Optimized',
    trend: 'neutral'
  }
]

const trainingData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Model A',
      data: [75, 82, 88, 92],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Model B',
      data: [65, 72, 78, 85],
      borderColor: 'rgb(168, 85, 247)',
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      tension: 0.4,
    },
    {
      label: 'Model C',
      data: [85, 88, 90, 94],
      borderColor: 'rgb(236, 72, 153)',
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
      tension: 0.4,
    },
  ],
}

export default function ModelInsights() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold rgb-text">Model Insights</h1>
          <p className="text-gray-400">Detailed analysis of model performance and training progress</p>
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
            Training Progress
          </Title>
          <div className="h-80">
            <Line
              data={trainingData}
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
            Model Performance
          </Title>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">Precision</Text>
              <Title className="text-lg font-semibold text-white">0.985</Title>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">Recall</Text>
              <Title className="text-lg font-semibold text-white">0.982</Title>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">F1 Score</Text>
              <Title className="text-lg font-semibold text-white">0.983</Title>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">Confidence Score</Text>
              <Title className="text-lg font-semibold text-white">0.978</Title>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 