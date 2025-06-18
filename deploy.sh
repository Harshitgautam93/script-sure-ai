#!/bin/bash

# Script Sure AI - Netlify Deployment Script

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are in the 'out' directory"
    echo ""
    echo "🌐 To deploy to Netlify:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to Netlify"
    echo "3. Set build command: npm run build"
    echo "4. Set publish directory: out"
    echo "5. Add environment variables:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    echo "📋 Don't forget to set up your Supabase project first!"
    echo "📖 See NETLIFY_SETUP.md for detailed instructions"
else
    echo "❌ Build failed!"
    exit 1
fi 