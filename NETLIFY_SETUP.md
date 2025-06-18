# Netlify Deployment Setup Guide

This project has been restructured to work with Netlify's static hosting limitations by using Supabase for authentication and database operations.

## Prerequisites

1. A Supabase account (free tier available)
2. A Netlify account (free tier available)

## Setup Instructions

### 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to Settings > API
3. Copy your Project URL and anon/public key

### 2. Create Database Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create grading_results table
CREATE TABLE grading_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  score DECIMAL(3,2) NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create model_insights table
CREATE TABLE model_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  accuracy DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE grading_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_insights ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own grading results" ON grading_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own grading results" ON grading_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view model insights" ON model_insights
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert model insights" ON model_insights
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```

### 3. Storage Setup

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `handwriting-images`
3. Set the bucket to public
4. Create a policy to allow authenticated users to upload:

```sql
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'handwriting-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'handwriting-images');
```

### 4. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Add environment variables in Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 6. Install Dependencies

Run these commands locally:

```bash
npm install
npm run build
```

## Features

- ✅ Authentication with Supabase Auth
- ✅ Database storage with Supabase PostgreSQL
- ✅ File uploads with Supabase Storage
- ✅ Static export compatible with Netlify
- ✅ Protected routes
- ✅ User management

## Migration from NextAuth

The project has been migrated from NextAuth.js to Supabase Auth to work with Netlify's static hosting. Key changes:

- Removed NextAuth dependencies
- Added Supabase client
- Updated authentication context
- Modified components to use Supabase
- Removed API routes (not supported on Netlify)

## Troubleshooting

1. **Build errors**: Make sure all environment variables are set in Netlify
2. **Authentication issues**: Check Supabase project settings and policies
3. **Database errors**: Verify RLS policies are correctly set up
4. **File upload issues**: Ensure storage bucket policies allow uploads

## Support

For issues with:
- Supabase: Check their [documentation](https://supabase.com/docs)
- Netlify: Check their [documentation](https://docs.netlify.com)
- Next.js: Check their [documentation](https://nextjs.org/docs) 