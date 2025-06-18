'use client'

import { useState } from 'react'
import { Card, Title, Text } from '@tremor/react'
import {
  DocumentDuplicateIcon,
  TranslateIcon,
  SparklesIcon,
  ArrowPathIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
]

const sampleLongText = `Artificial Intelligence (AI) has revolutionized the way we process and analyze data. 
Machine learning algorithms can now identify patterns and make predictions with remarkable accuracy. 
Deep learning models have achieved breakthroughs in image recognition, natural language processing, and autonomous systems. 
The integration of AI into various industries has led to increased efficiency and innovation. 
However, it's crucial to consider ethical implications and ensure responsible development of these technologies.`

export default function AdvancedNLPFeatures() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState('summarize')
  const [results, setResults] = useState<any>(null)
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('es')

  const handleProcess = () => {
    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      setResults({
        summarize: {
          summary: 'AI has transformed data processing and analysis, enabling pattern recognition and predictions. Deep learning advances in image recognition and NLP have led to industry-wide efficiency improvements, though ethical considerations remain crucial.',
          compression: '60%',
          keyPoints: [
            'AI revolutionizes data processing',
            'Machine learning enables pattern recognition',
            'Deep learning breakthroughs in multiple fields',
            'Industry-wide efficiency improvements',
            'Ethical considerations are important'
          ]
        },
        translate: {
          translatedText: 'La Inteligencia Artificial (IA) ha revolucionado la forma en que procesamos y analizamos datos. Los algoritmos de aprendizaje automático ahora pueden identificar patrones y hacer predicciones con una precisión notable.',
          confidence: 0.95
        },
        generate: {
          generatedText: 'The future of AI holds immense potential for transforming industries and improving human lives. With continued advancements in machine learning and neural networks, we can expect more sophisticated applications in healthcare, education, and environmental protection.',
          creativity: 0.85,
          coherence: 0.92
        }
      })
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('summarize')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'summarize'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Text Summarization
        </button>
        <button
          onClick={() => setActiveTab('translate')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'translate'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Translation
        </button>
        <button
          onClick={() => setActiveTab('generate')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'generate'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Text Generation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Title>
            {activeTab === 'summarize' && 'Text Summarization'}
            {activeTab === 'translate' && 'Text Translation'}
            {activeTab === 'generate' && 'Text Generation'}
          </Title>
          <div className="mt-4">
            {activeTab === 'summarize' && (
              <textarea
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter text to summarize..."
                defaultValue={sampleLongText}
              />
            )}
            {activeTab === 'translate' && (
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <select
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter text to translate..."
                  defaultValue={sampleLongText}
                />
              </div>
            )}
            {activeTab === 'generate' && (
              <textarea
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter a prompt for text generation..."
                defaultValue="Write about the future of artificial intelligence..."
              />
            )}
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="mt-4 w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  {activeTab === 'summarize' && <DocumentDuplicateIcon className="h-5 w-5 mr-2" />}
                  {activeTab === 'translate' && <TranslateIcon className="h-5 w-5 mr-2" />}
                  {activeTab === 'generate' && <SparklesIcon className="h-5 w-5 mr-2" />}
                  {activeTab === 'summarize' && 'Summarize Text'}
                  {activeTab === 'translate' && 'Translate Text'}
                  {activeTab === 'generate' && 'Generate Text'}
                </>
              )}
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <Title>Results</Title>
          {results ? (
            <div className="mt-4 space-y-6">
              {activeTab === 'summarize' && (
                <>
                  <div>
                    <Text className="font-medium">Summary</Text>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <Text>{results.summarize.summary}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="font-medium">Compression Rate</Text>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: results.summarize.compression }}
                        ></div>
                      </div>
                      <Text className="ml-2">{results.summarize.compression}</Text>
                    </div>
                  </div>
                  <div>
                    <Text className="font-medium">Key Points</Text>
                    <div className="mt-2 space-y-2">
                      {results.summarize.keyPoints.map((point: string) => (
                        <div key={point} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                          <Text>{point}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'translate' && (
                <div>
                  <Text className="font-medium">Translated Text</Text>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <Text>{results.translate.translatedText}</Text>
                    <div className="mt-2 flex items-center justify-between">
                      <Text className="text-sm text-gray-500">
                        Confidence: {results.translate.confidence * 100}%
                      </Text>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'generate' && (
                <div>
                  <Text className="font-medium">Generated Text</Text>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <Text>{results.generate.generatedText}</Text>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-sm font-medium">Creativity</Text>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${results.generate.creativity * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <Text className="text-sm font-medium">Coherence</Text>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full"
                            style={{ width: `${results.generate.coherence * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 p-8 text-center text-gray-500">
              {activeTab === 'summarize' && <DocumentDuplicateIcon className="mx-auto h-12 w-12 text-gray-400" />}
              {activeTab === 'translate' && <TranslateIcon className="mx-auto h-12 w-12 text-gray-400" />}
              {activeTab === 'generate' && <SparklesIcon className="mx-auto h-12 w-12 text-gray-400" />}
              <Text className="mt-2">
                {activeTab === 'summarize' && 'Enter text and click summarize to see results'}
                {activeTab === 'translate' && 'Enter text and click translate to see results'}
                {activeTab === 'generate' && 'Enter a prompt and click generate to see results'}
              </Text>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 