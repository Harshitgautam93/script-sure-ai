import { supabase, GradingResult, ModelInsight } from './supabase'

export class DatabaseService {
  // Grading Results
  static async saveGradingResult(result: Omit<GradingResult, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('grading_results')
      .insert([result])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getGradingResults(userId: string) {
    const { data, error } = await supabase
      .from('grading_results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  static async getAllGradingResults() {
    const { data, error } = await supabase
      .from('grading_results')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // Model Insights
  static async saveModelInsight(insight: Omit<ModelInsight, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('model_insights')
      .insert([insight])
      .select()
      .single()

    if (error) throw error
    return data
  }

  static async getModelInsights() {
    const { data, error } = await supabase
      .from('model_insights')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }

  // File Upload
  static async uploadImage(file: File, userId: string) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('handwriting-images')
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('handwriting-images')
      .getPublicUrl(fileName)

    return publicUrl
  }

  // Analytics
  static async getAnalytics() {
    const { data: gradingResults, error: gradingError } = await supabase
      .from('grading_results')
      .select('*')

    if (gradingError) throw gradingError

    const totalGradings = gradingResults.length
    const averageScore = gradingResults.reduce((acc: number, result: GradingResult) => acc + result.score, 0) / totalGradings
    const recentGradings = gradingResults.filter((result: GradingResult) => {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      return new Date(result.created_at) > oneWeekAgo
    }).length

    return {
      totalGradings,
      averageScore: Math.round(averageScore * 100) / 100,
      recentGradings,
      totalUsers: new Set(gradingResults.map((r: GradingResult) => r.user_id)).size
    }
  }
} 