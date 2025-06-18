'use client'

export default function DebugEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="p-4 bg-gray-800 rounded-lg mb-4">
      <h3 className="text-white font-bold mb-2">Environment Variables Debug:</h3>
      <div className="text-sm">
        <p className="text-gray-300">
          <strong>SUPABASE_URL:</strong> {supabaseUrl ? '✅ Set' : '❌ Missing'}
        </p>
        <p className="text-gray-300">
          <strong>SUPABASE_KEY:</strong> {supabaseKey ? '✅ Set' : '❌ Missing'}
        </p>
        {supabaseUrl && (
          <p className="text-gray-400 text-xs mt-2">
            URL: {supabaseUrl.substring(0, 30)}...
          </p>
        )}
      </div>
    </div>
  )
} 