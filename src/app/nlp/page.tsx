'use client'

import { useState } from 'react'
import { Card, Title, Text } from '@tremor/react'
import {
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  LanguageIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

interface NLPAnalysis {
  sentiment: {
    score: number
    label: string
  }
  entities: Array<{
    text: string
    type: string
    confidence: number
  }>
  summary: string
  keywords: string[]
}

const sampleText = `The new AI model demonstrates remarkable capabilities in natural language understanding. 
It can process complex sentences, identify key entities, and generate meaningful summaries. 
The system's performance has improved significantly over the past few months, achieving 
state-of-the-art results in various NLP benchmarks.`

export default function NLPFeatures() {
  const [text, setText] = useState(sampleText)
  const [analysis, setAnalysis] = useState<NLPAnalysis>({
    sentiment: {
      score: 0.85,
      label: 'Positive',
    },
    entities: [
      {
        text: 'AI model',
        type: 'Technology',
        confidence: 0.95,
      },
      {
        text: 'NLP benchmarks',
        type: 'Domain',
        confidence: 0.92,
      },
    ],
    summary:
      'The AI model shows impressive NLP capabilities with significant performance improvements.',
    keywords: ['AI model', 'natural language', 'performance', 'benchmarks'],
  })

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    // Simulate analysis update
    setTimeout(() => {
      setAnalysis({
        sentiment: {
          score: Math.random() * 0.5 + 0.5,
          label: Math.random() > 0.5 ? 'Positive' : 'Neutral',
        },
        entities: [
          {
            text: 'AI',
            type: 'Technology',
            confidence: 0.95,
          },
        ],
        summary: 'Updated analysis of the input text.',
        keywords: ['AI', 'analysis', 'text'],
      })
    }, 1000)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold rgb-text">NLP Features</h1>
          <p className="text-gray-400">
            Analyze and process text using advanced NLP capabilities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4">
            Text Analysis
          </Title>
          <div className="space-y-4">
            <textarea
              value={text}
              onChange={handleTextChange}
              className="w-full h-48 p-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
              placeholder="Enter text to analyze..."
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-400 mr-3" />
                  <div>
                    <Text className="text-gray-400">Sentiment</Text>
                    <Title className="text-lg font-semibold text-white">
                      {analysis.sentiment.label}
                    </Title>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <LanguageIcon className="w-8 h-8 text-secondary-400 mr-3" />
                  <div>
                    <Text className="text-gray-400">Entities</Text>
                    <Title className="text-lg font-semibold text-white">
                      {analysis.entities.length}
                    </Title>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4">
            Analysis Results
          </Title>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">Summary</Text>
              <Title className="text-lg font-semibold text-white mt-1">
                {analysis.summary}
              </Title>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">Keywords</Text>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <Text className="text-gray-400">Detected Entities</Text>
              <div className="space-y-2 mt-2">
                {analysis.entities.map((entity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-gray-700/50 rounded"
                  >
                    <div>
                      <Text className="text-white">{entity.text}</Text>
                      <Text className="text-sm text-gray-400">{entity.type}</Text>
                    </div>
                    <Text className="text-sm text-gray-400">
                      {(entity.confidence * 100).toFixed(0)}%
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rgb-border bg-gray-900 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <SparklesIcon className="w-8 h-8 text-primary-400 mr-3" />
            <div>
              <Text className="text-gray-400">Sentiment Analysis</Text>
              <Title className="text-lg font-semibold text-white">
                Real-time
              </Title>
            </div>
          </div>
        </Card>
        <Card className="rgb-border bg-gray-900 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <DocumentTextIcon className="w-8 h-8 text-secondary-400 mr-3" />
            <div>
              <Text className="text-gray-400">Text Summarization</Text>
              <Title className="text-lg font-semibold text-white">
                Available
              </Title>
            </div>
          </div>
        </Card>
        <Card className="rgb-border bg-gray-900 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <LanguageIcon className="w-8 h-8 text-green-400 mr-3" />
            <div>
              <Text className="text-gray-400">Entity Recognition</Text>
              <Title className="text-lg font-semibold text-white">
                Active
              </Title>
            </div>
          </div>
        </Card>
        <Card className="rgb-border bg-gray-900 hover:scale-105 transition-transform duration-300">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-yellow-400 mr-3" />
            <div>
              <Text className="text-gray-400">Language Detection</Text>
              <Title className="text-lg font-semibold text-white">
                Enabled
              </Title>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 