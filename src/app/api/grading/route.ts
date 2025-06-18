import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      assignmentId,
      overallScore,
      accuracy,
      completeness,
      legibility,
      presentation,
      grade,
      feedback,
      suggestions,
      timeSpent,
      qualityMetrics,
      assignmentType
    } = await request.json()

    // Create or update assignment if assignmentId is provided
    let assignment = null
    if (assignmentId) {
      assignment = await prisma.assignment.findUnique({
        where: { id: assignmentId }
      })
    }

    if (!assignment) {
      // Create new assignment
      assignment = await prisma.assignment.create({
        data: {
          title: `Handwriting Assignment - ${assignmentType || 'General'}`,
          subject: assignmentType || 'General',
          dueDate: new Date(),
          status: 'GRADED',
          userId: session.user.id
        }
      })
    }

    // Save grading result
    const gradingResult = await prisma.gradingResult.create({
      data: {
        assignmentId: assignment.id,
        userId: session.user.id,
        overallScore,
        accuracy,
        completeness,
        legibility,
        presentation,
        grade,
        feedback: Array.isArray(feedback) ? feedback.join(', ') : feedback,
        suggestions: Array.isArray(suggestions) ? suggestions.join(', ') : suggestions,
        timeSpent,
        qualityMetrics: JSON.stringify(qualityMetrics),
        processingTimestamp: new Date()
      }
    })

    // Update assignment status
    await prisma.assignment.update({
      where: { id: assignment.id },
      data: { status: 'GRADED' }
    })

    return NextResponse.json({
      message: 'Grading result saved successfully',
      gradingResult,
      assignment
    })

  } catch (error) {
    console.error('Grading save error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const assignmentId = searchParams.get('assignmentId')

    if (assignmentId) {
      // Get specific grading result
      const gradingResult = await prisma.gradingResult.findFirst({
        where: {
          assignmentId,
          userId: session.user.id
        },
        include: {
          assignment: true
        }
      })

      if (!gradingResult) {
        return NextResponse.json(
          { message: 'Grading result not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(gradingResult)
    } else {
      // Get all grading results for user
      const gradingResults = await prisma.gradingResult.findMany({
        where: {
          userId: session.user.id
        },
        include: {
          assignment: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return NextResponse.json(gradingResults)
    }

  } catch (error) {
    console.error('Grading fetch error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 