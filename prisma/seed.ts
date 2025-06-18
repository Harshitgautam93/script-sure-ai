const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  await prisma.user.upsert({
    where: { email: 'admin@scriptsure.ai' },
    update: {},
    create: {
      email: 'admin@scriptsure.ai',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })

  // Create sample user
  const userPassword = await bcrypt.hash('user123', 12)
  
  await prisma.user.upsert({
    where: { email: 'user@scriptsure.ai' },
    update: {},
    create: {
      email: 'user@scriptsure.ai',
      name: 'Test User',
      password: userPassword,
      role: 'USER',
    },
  })

  // Create sample teacher
  const teacherPassword = await bcrypt.hash('teacher123', 12)
  
  await prisma.user.upsert({
    where: { email: 'teacher@scriptsure.ai' },
    update: {},
    create: {
      email: 'teacher@scriptsure.ai',
      name: 'Sample Teacher',
      password: teacherPassword,
      role: 'TEACHER',
    },
  })

  // Create sample assignments
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@scriptsure.ai' }
  })

  const testUser = await prisma.user.findUnique({
    where: { email: 'user@scriptsure.ai' }
  })

  if (adminUser) {
    await prisma.assignment.upsert({
      where: { id: 'sample-assignment-1' },
      update: {},
      create: {
        id: 'sample-assignment-1',
        title: 'Mathematics Problem Set',
        subject: 'Algebra',
        description: 'Solve quadratic equations and linear systems',
        dueDate: new Date('2024-02-20'),
        status: 'GRADED',
        userId: adminUser.id,
      },
    })

    await prisma.assignment.upsert({
      where: { id: 'sample-assignment-2' },
      update: {},
      create: {
        id: 'sample-assignment-2',
        title: 'Essay on Shakespeare',
        subject: 'English Literature',
        description: 'Analyze themes in Hamlet',
        dueDate: new Date('2024-02-18'),
        status: 'GRADED',
        userId: adminUser.id,
      },
    })
  }

  if (testUser) {
    await prisma.assignment.upsert({
      where: { id: 'sample-assignment-3' },
      update: {},
      create: {
        id: 'sample-assignment-3',
        title: 'Physics Lab Report',
        subject: 'Physics',
        description: 'Experiment on motion and forces',
        dueDate: new Date('2024-02-22'),
        status: 'PENDING',
        userId: testUser.id,
      },
    })
  }

  // Create sample grading results
  if (adminUser) {
    await prisma.gradingResult.upsert({
      where: { id: 'sample-result-1' },
      update: {},
      create: {
        id: 'sample-result-1',
        assignmentId: 'sample-assignment-1',
        userId: adminUser.id,
        overallScore: 92.5,
        accuracy: 95.0,
        completeness: 90.0,
        legibility: 88.0,
        presentation: 95.0,
        grade: 'A-',
        feedback: 'Excellent mathematical reasoning demonstrated, Clear step-by-step problem solving approach',
        suggestions: 'Practice writing numbers more clearly, Use more space between problems',
        timeSpent: 25,
        qualityMetrics: JSON.stringify({
          edge_density: 0.85,
          stroke_consistency: 0.78,
          line_straightness: 0.92
        }),
        processingTimestamp: new Date('2024-02-19T10:30:00Z'),
      },
    })

    await prisma.gradingResult.upsert({
      where: { id: 'sample-result-2' },
      update: {},
      create: {
        id: 'sample-result-2',
        assignmentId: 'sample-assignment-2',
        userId: adminUser.id,
        overallScore: 88.0,
        accuracy: 92.0,
        completeness: 85.0,
        legibility: 90.0,
        presentation: 88.0,
        grade: 'B+',
        feedback: 'Good analysis of themes, Well-structured arguments',
        suggestions: 'Provide more textual evidence, Expand on character motivations',
        timeSpent: 30,
        qualityMetrics: JSON.stringify({
          edge_density: 0.82,
          stroke_consistency: 0.85,
          line_straightness: 0.88
        }),
        processingTimestamp: new Date('2024-02-17T14:15:00Z'),
      },
    })
  }

  // Create sample model performance data
  await prisma.modelPerformance.upsert({
    where: { id: 'model-perf-1' },
    update: {},
    create: {
      id: 'model-perf-1',
      modelName: 'Handwriting Recognition v1.0',
      accuracy: 96.5,
      precision: 95.2,
      recall: 97.1,
      f1Score: 96.1,
      inferenceSpeed: 45.0,
      trainingProgress: 100.0,
      timestamp: new Date(),
    },
  })

  // Create sample system metrics
  await prisma.systemMetrics.upsert({
    where: { id: 'sys-metrics-1' },
    update: {},
    create: {
      id: 'sys-metrics-1',
      cpuUsage: 65.0,
      memoryUsage: 45.0,
      gpuUsage: 80.0,
      storageUsage: 30.0,
      activeUsers: 1247,
      apiRequests: 1250000,
      successRate: 98.5,
      timestamp: new Date(),
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log('📧 Test Accounts Created:')
  console.log('   Admin: admin@scriptsure.ai / admin123')
  console.log('   User: user@scriptsure.ai / user123')
  console.log('   Teacher: teacher@scriptsure.ai / teacher123')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 