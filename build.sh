# Build script for Render.com
echo "🚀 Starting build process..."
echo "📦 Installing dependencies..."
cd backend
npm ci --only=production
echo "✅ Build completed!"
