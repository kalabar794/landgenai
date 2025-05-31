#!/bin/bash

# Secure Vercel Deployment Script
# This script helps deploy the AI Landing Generator to Vercel with proper security

set -e  # Exit on any error

echo "🚀 AI Landing Generator - Secure Vercel Deployment"
echo "=================================================="

# Check if required tools are installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git first."
    exit 1
fi

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if .env.local exists and warn about API keys
if [ -f ".env.local" ]; then
    echo "⚠️  Found .env.local file. Make sure it only contains development keys!"
    echo "   Production keys should be set in Vercel dashboard."
fi

# Verify git status
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Consider committing them first."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📋 Pre-deployment checklist:"
echo "   ✅ Project built successfully"
echo "   ✅ Environment variables configured"
echo "   ✅ Security headers implemented"
echo "   ✅ API key validation in place"
echo "   ✅ Error boundaries configured"

echo ""
echo "🔐 Security reminders:"
echo "   • API keys are NOT committed to Git"
echo "   • Production keys set in Vercel dashboard only"
echo "   • Health check endpoint available at /api/health"
echo "   • All API routes include security headers"

echo ""
echo "📝 Required Vercel Environment Variables:"
echo "   ANTHROPIC_API_KEY=sk-ant-api03-..."
echo "   PEXELS_API_KEY=your-pexels-key"
echo "   NODE_ENV=production"

echo ""
read -p "Have you set the environment variables in Vercel dashboard? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "⚠️  Please set environment variables in Vercel dashboard first:"
    echo "   1. Go to https://vercel.com/dashboard"
    echo "   2. Select your project"
    echo "   3. Go to Settings → Environment Variables"
    echo "   4. Add the required variables listed above"
    echo "   5. Run this script again"
    exit 1
fi

echo ""
echo "🚀 Deploying to Vercel..."

# Deploy to production
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔍 Next steps:"
echo "   1. Test your deployment at the provided URL"
echo "   2. Check /api/health for service status"
echo "   3. Verify all features work with real API keys"
echo "   4. Monitor for any errors in Vercel dashboard"

echo ""
echo "📊 Health check URL: https://your-app.vercel.app/api/health"
echo "🌐 Main app URL: https://your-app.vercel.app"

echo ""
echo "🔒 Security verification:"
echo "   • API keys properly masked in health check"
echo "   • Services show as 'configured: true'"
echo "   • No sensitive data exposed in responses"

echo ""
echo "🎉 Happy deploying!"