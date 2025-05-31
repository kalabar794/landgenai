# 🤖 AI Landing Page Generator

Generate beautiful, high-converting landing pages using AI in minutes.

## ✨ Features

- **AI-Powered Content**: Claude AI generates compelling copy tailored to your business
- **Smart Image Curation**: Pexels API integration for professional stock photos
- **Database Persistence**: Save and manage generated landing pages
- **Optimized Performance**: Next.js Image optimization with WebP/AVIF support
- **Error Boundaries**: Graceful error handling with fallbacks
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript coverage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API keys for Anthropic Claude and Pexels

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kalabar794/landgenai.git
   cd landgenai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your API keys:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
   PEXELS_API_KEY=your-pexels-key-here
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Environment Variables

### Required for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Claude AI API key | `sk-ant-api03-...` |
| `PEXELS_API_KEY` | Pexels stock photos API key | `abc123...` |

### Optional

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `DATABASE_URL` | Database connection string | `file:local.db` |

### Getting API Keys

1. **Anthropic Claude API**
   - Visit [https://console.anthropic.com](https://console.anthropic.com)
   - Sign up and create an API key
   - Choose a plan that fits your usage

2. **Pexels API**
   - Visit [https://www.pexels.com/api/](https://www.pexels.com/api/)
   - Sign up for a free account
   - Generate an API key (free tier includes 200 requests/hour)

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Playwright tests
npm run test:ui      # Run tests with UI
```

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── page.tsx        # Homepage
│   ├── saved/          # Saved pages browser
│   └── view/[id]/      # Individual page viewer
├── components/         # Reusable components
│   ├── forms/          # Form components
│   └── ui/             # UI components
├── lib/                # Utilities and configurations
│   ├── anthropic.ts    # Claude AI integration
│   ├── database.ts     # Database operations
│   ├── images.ts       # Pexels integration
│   └── env.ts          # Environment validation
└── data/               # Static data and examples
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `PEXELS_API_KEY`
   - `NODE_ENV=production`
3. **Deploy** automatically on git push

### Other Platforms

The app works on any platform supporting Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test file
npx playwright test tests/homepage.spec.ts

# Run tests in UI mode
npm run test:ui

# Debug tests
npm run test:debug
```

## 🔒 Security

- **API Keys**: Never commit API keys to version control
- **Environment Variables**: Use `.env.local` for sensitive data
- **Security Headers**: All API routes include security headers
- **Input Validation**: All user inputs are validated and sanitized
- **Error Handling**: Sensitive information is not exposed in error messages

## 📈 Performance

- **Bundle Size**: ~119KB First Load JS
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Database**: In-memory SQLite for serverless deployments
- **Caching**: Built-in Next.js caching and optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/kalabar794/landgenai/issues)
- **Documentation**: This README and inline code comments
- **Health Check**: `/api/health` endpoint for deployment verification

## 🎯 Roadmap

- [ ] User authentication and accounts
- [ ] Template library and customization
- [ ] A/B testing capabilities
- [ ] SEO optimization tools
- [ ] Multi-language support
- [ ] Advanced analytics

---

Built with ❤️ using Next.js, TypeScript, and AI.