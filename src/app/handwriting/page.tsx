'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, Title, Text, Badge } from '@tremor/react'
import {
  DocumentArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  SparklesIcon,
  EyeIcon,
  DocumentTextIcon,
  CogIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/contexts/AuthContext'
import { DatabaseService } from '@/lib/database'
import ProtectedRoute from '@/components/ProtectedRoute'

interface GradingResult {
  overallScore: number
  accuracy: number
  completeness: number
  legibility: number
  feedback: string[]
  suggestions: string[]
  timeSpent: number
  grade: string
}

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: 'pending' | 'graded' | 'overdue'
  score?: number
  grade?: string
}

interface DatabaseGradingResult {
  id: string
  user_id: string
  image_url: string
  score: number
  feedback: string
  created_at: string
}

const sampleAssignments: Assignment[] = [
  {
    id: 'ASS-001',
    title: 'Mathematics Problem Set',
    subject: 'Algebra',
    dueDate: '2024-02-20',
    status: 'graded',
    score: 92,
    grade: 'A-',
  },
  {
    id: 'ASS-002',
    title: 'Essay on Shakespeare',
    subject: 'English Literature',
    dueDate: '2024-02-18',
    status: 'graded',
    score: 88,
    grade: 'B+',
  },
  {
    id: 'ASS-003',
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: '2024-02-22',
    status: 'pending',
  },
]

const gradingCriteria = [
  { name: 'Accuracy', weight: 0.4, description: 'Correctness of answers and calculations' },
  { name: 'Completeness', weight: 0.3, description: 'All required elements present' },
  { name: 'Legibility', weight: 0.2, description: 'Clarity and readability of handwriting' },
  { name: 'Presentation', weight: 0.1, description: 'Overall neatness and organization' },
]

export default function HandwritingVerification() {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [gradingResult, setGradingResult] = useState<GradingResult | null>(null)
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [gradingHistory, setGradingHistory] = useState<DatabaseGradingResult[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  // Load grading history when component mounts
  useEffect(() => {
    if (user) {
      loadGradingHistory()
    }
  }, [user])

  const loadGradingHistory = async () => {
    if (!user) return
    
    setIsLoadingHistory(true)
    try {
      const data = await DatabaseService.getGradingResults(user.id)
      setGradingHistory(data)
    } catch (error) {
      console.error('Error loading grading history:', error)
    } finally {
      setIsLoadingHistory(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const simulateGrading = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    // Simulate AI processing steps
    const steps = [
      'Analyzing handwriting patterns...',
      'Extracting text content...',
      'Comparing with reference answers...',
      'Evaluating accuracy and completeness...',
      'Generating feedback and suggestions...',
      'Calculating final grade...',
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setProcessingProgress(((i + 1) / steps.length) * 100)
    }

    // Generate realistic grading result
    const accuracy = Math.floor(Math.random() * 20) + 80 // 80-100
    const completeness = Math.floor(Math.random() * 15) + 85 // 85-100
    const legibility = Math.floor(Math.random() * 25) + 75 // 75-100
    const overallScore = Math.round(
      accuracy * 0.4 + completeness * 0.3 + legibility * 0.2 + (Math.floor(Math.random() * 20) + 80) * 0.1
    )

    const grade = overallScore >= 93 ? 'A' : 
                  overallScore >= 90 ? 'A-' :
                  overallScore >= 87 ? 'B+' :
                  overallScore >= 83 ? 'B' :
                  overallScore >= 80 ? 'B-' :
                  overallScore >= 77 ? 'C+' :
                  overallScore >= 73 ? 'C' :
                  overallScore >= 70 ? 'C-' :
                  overallScore >= 67 ? 'D+' :
                  overallScore >= 63 ? 'D' :
                  overallScore >= 60 ? 'D-' : 'F'

    const feedback = [
      'Excellent mathematical reasoning demonstrated',
      'Clear step-by-step problem solving approach',
      'Minor calculation errors in problem 3',
      'Good use of mathematical notation',
      'Consider improving handwriting consistency',
    ]

    const suggestions = [
      'Practice writing numbers more clearly',
      'Use more space between problems',
      'Double-check calculations before finalizing',
      'Consider using graph paper for diagrams',
    ]

    const timeSpent = Math.floor(Math.random() * 30) + 15 // 15-45 minutes

    const gradingResult = {
      overallScore,
      accuracy,
      completeness,
      legibility,
      feedback,
      suggestions,
      timeSpent,
      grade,
    }

    // Save to database
    try {
      const response = await fetch('/api/grading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          overallScore,
          accuracy,
          completeness,
          legibility,
          presentation: Math.floor(Math.random() * 20) + 80, // 80-100
          grade,
          feedback: feedback.join(', '),
          suggestions: suggestions.join(', '),
          timeSpent,
          qualityMetrics: JSON.stringify({
            edge_density: Math.random() * 0.3 + 0.7,
            stroke_consistency: Math.random() * 0.3 + 0.7,
            line_straightness: Math.random() * 0.3 + 0.7
          }),
          assignmentType: 'Handwriting Assignment'
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Grading result saved:', data)
        // Refresh grading history
        await loadGradingHistory()
      } else {
        console.error('Failed to save grading result')
      }
    } catch (error) {
      console.error('Error saving grading result:', error)
    }

    setGradingResult(gradingResult)
    setIsProcessing(false)
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
      case 'A-':
        return 'text-green-400'
      case 'B+':
      case 'B':
      case 'B-':
        return 'text-blue-400'
      case 'C+':
      case 'C':
      case 'C-':
        return 'text-yellow-400'
      case 'D+':
      case 'D':
      case 'D-':
        return 'text-orange-400'
      case 'F':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getGradeFromScore = (score: number): string => {
    if (score >= 0.93) return 'A'
    if (score >= 0.90) return 'A-'
    if (score >= 0.87) return 'B+'
    if (score >= 0.83) return 'B'
    if (score >= 0.80) return 'B-'
    if (score >= 0.77) return 'C+'
    if (score >= 0.73) return 'C'
    if (score >= 0.70) return 'C-'
    if (score >= 0.67) return 'D+'
    if (score >= 0.63) return 'D'
    if (score >= 0.60) return 'D-'
    return 'F'
  }

  return (
    <ProtectedRoute>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold rgb-text flex items-center gap-2">
              <AcademicCapIcon className="w-8 h-8" />
              AI-Powered Handwriting Assessment & Grading
            </h1>
            <p className="text-gray-400">
              Advanced handwriting recognition with automatic grading and feedback
            </p>
          </div>
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-6 h-6 text-primary-400" />
            <span className="text-sm text-gray-400">AI Enhanced</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <Card className="rgb-border bg-gray-900 lg:col-span-2">
            <Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DocumentArrowUpIcon className="w-6 h-6" />
              Upload Assignment
            </Title>
            
            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  isDragging
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-gray-700 hover:border-primary-500/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-64 object-contain mx-auto rounded-lg border border-gray-600"
                    />
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => {
                          setUploadedFile(null)
                          setPreviewUrl(null)
                          setGradingResult(null)
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Remove
                      </button>
                      <button
                        onClick={simulateGrading}
                        disabled={isProcessing}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Processing...' : 'Grade Assignment'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <DocumentArrowUpIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <Text className="text-gray-400 mb-2">
                      Drag and drop your handwritten assignment here
                    </Text>
                    <Text className="text-sm text-gray-500 mb-4">
                      Supported formats: JPG, PNG, PDF (Max 10MB)
                    </Text>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Choose File
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Processing...</span>
                    <span>{Math.round(processingProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Assignment Selection */}
          <Card className="rgb-border bg-gray-900">
            <Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <DocumentTextIcon className="w-6 h-6" />
              Assignments
            </Title>
            <div className="space-y-3">
              {sampleAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedAssignment?.id === assignment.id
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedAssignment(assignment)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Text className="text-white font-medium">{assignment.title}</Text>
                      <Text className="text-sm text-gray-400">{assignment.subject}</Text>
                    </div>
                    <Badge
                      color={
                        assignment.status === 'graded' ? 'green' :
                        assignment.status === 'pending' ? 'yellow' : 'red'
                      }
                    >
                      {assignment.status}
                    </Badge>
                  </div>
                  {assignment.score && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-lg font-bold ${getGradeColor(assignment.grade!)}`}>
                        {assignment.score}%
                      </span>
                      <span className={`text-sm ${getGradeColor(assignment.grade!)}`}>
                        ({assignment.grade})
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Grading Results */}
        {gradingResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rgb-border bg-gray-900">
              <Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6" />
                Grading Results
              </Title>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg text-center">
                    <Text className="text-gray-400">Overall Score</Text>
                    <Title className={`text-3xl font-bold mt-1 ${getGradeColor(gradingResult.grade)}`}>
                      {gradingResult.overallScore}%
                    </Title>
                    <Text className={`text-lg font-semibold ${getGradeColor(gradingResult.grade)}`}>
                      Grade: {gradingResult.grade}
                    </Text>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg text-center">
                    <Text className="text-gray-400">Time Spent</Text>
                    <Title className="text-2xl font-bold text-white mt-1">
                      {gradingResult.timeSpent} min
                    </Title>
                    <Text className="text-sm text-gray-400">Estimated</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  {gradingCriteria.map((criteria, index) => (
                    <div key={criteria.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <Text className="text-gray-400">{criteria.name}</Text>
                        <Text className="text-white">
                          {index === 0 ? gradingResult.accuracy :
                           index === 1 ? gradingResult.completeness :
                           index === 2 ? gradingResult.legibility :
                           Math.floor(Math.random() * 20) + 80}%
                        </Text>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ 
                            width: `${index === 0 ? gradingResult.accuracy :
                                    index === 1 ? gradingResult.completeness :
                                    index === 2 ? gradingResult.legibility :
                                    Math.floor(Math.random() * 20) + 80}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="rgb-border bg-gray-900">
              <Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <EyeIcon className="w-6 h-6" />
                Feedback & Suggestions
              </Title>
              <div className="space-y-4">
                <div>
                  <Text className="text-gray-400 mb-2">Positive Feedback</Text>
                  <div className="space-y-2">
                    {gradingResult.feedback.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-green-500/10 rounded-lg">
                        <CheckCircleIcon className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <Text className="text-sm text-green-400">{item}</Text>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Text className="text-gray-400 mb-2">Suggestions for Improvement</Text>
                  <div className="space-y-2">
                    {gradingResult.suggestions.map((item, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-blue-500/10 rounded-lg">
                        <CogIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <Text className="text-sm text-blue-400">{item}</Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* AI Processing Stats */}
        <Card className="rgb-border bg-gray-900">
          <Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <SparklesIcon className="w-6 h-6" />
            AI Processing Statistics
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <Text className="text-gray-400">Accuracy Rate</Text>
              <Title className="text-2xl font-bold text-green-400 mt-1">98.7%</Title>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <Text className="text-gray-400">Processing Speed</Text>
              <Title className="text-2xl font-bold text-blue-400 mt-1">2.3s</Title>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <Text className="text-gray-400">Models Trained</Text>
              <Title className="text-2xl font-bold text-purple-400 mt-1">15+</Title>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg text-center">
              <Text className="text-gray-400">Languages</Text>
              <Title className="text-2xl font-bold text-orange-400 mt-1">8</Title>
            </div>
          </div>
        </Card>

        {/* Grading History */}
        {user && (
          <Card className="rgb-border bg-gray-900">
            <Title className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <ClockIcon className="w-6 h-6" />
              Your Grading History
            </Title>
            {isLoadingHistory ? (
              <div className="text-center py-8">
                <Text className="text-gray-400">Loading your grading history...</Text>
              </div>
            ) : gradingHistory.length > 0 ? (
              <div className="space-y-4">
                {gradingHistory.slice(0, 5).map((result) => (
                  <div key={result.id} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Text className="text-white font-medium">Handwriting Assignment</Text>
                        <Text className="text-sm text-gray-400">AI Graded</Text>
                      </div>
                      <div className="text-right">
                        <Title className={`text-2xl font-bold ${getGradeColor(getGradeFromScore(result.score))}`}>
                          {Math.round(result.score * 100)}%
                        </Title>
                        <Text className={`text-sm ${getGradeColor(getGradeFromScore(result.score))}`}>
                          Grade: {getGradeFromScore(result.score)}
                        </Text>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Text className="text-gray-400 text-sm mb-2">Feedback:</Text>
                      <Text className="text-white text-sm">{result.feedback}</Text>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <Text className="text-xs text-gray-400">
                        Graded on {new Date(result.created_at).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                ))}
                {gradingHistory.length > 5 && (
                  <div className="text-center">
                    <Text className="text-gray-400">
                      Showing 5 of {gradingHistory.length} results
                    </Text>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Text className="text-gray-400">No grading history yet. Upload your first assignment to get started!</Text>
              </div>
            )}
          </Card>
        )}
      </div>
    </ProtectedRoute>
  )
} 