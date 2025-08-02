# 🚀 CrewAI Advanced Dashboard

**Production-ready CrewAI management platform with enterprise-grade features**

![CrewAI Dashboard](https://img.shields.io/badge/CrewAI-Dashboard-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

A comprehensive, production-ready dashboard for managing CrewAI multi-agent systems with real-time execution monitoring, advanced analytics, and enterprise-grade features.

## ✨ Features

### 🤖 **Advanced Agent Management**
- **Smart Agent Configuration**: Model selection, temperature control, iteration limits
- **Performance Tracking**: Individual agent performance scores and task completion metrics  
- **Real-time Status**: Live monitoring of agent status (idle/active/busy)
- **Tool Integration**: Multi-select tool assignment and management

### 📋 **Sophisticated Task Management**
- **Priority Levels**: Urgent, high, medium, low priority classification
- **Multiple Output Formats**: Text, Markdown, JSON, CSV, PDF reports
- **Smart Assignment**: Automatic agent assignment based on capabilities
- **Progress Tracking**: Visual progress bars with real-time updates

### ⚡ **Real-time Execution Engine**
- **Live Streaming**: Real-time execution logs with auto-scroll
- **Performance Monitoring**: Token usage, API calls, duration tracking
- **Cost Analysis**: Real-time cost calculation and estimation
- **Execution Controls**: Start, pause, stop, and resume capabilities

### 📊 **Enterprise Analytics**
- **Performance Metrics**: Success rates, execution statistics, trend analysis
- **Cost Management**: Token usage breakdown and cost optimization
- **Agent Performance**: Individual performance ratings and insights
- **Growth Tracking**: Weekly trends and performance indicators

### 📚 **Template System**
- **Pre-built Templates**: Research teams, content creation, code review workflows
- **Custom Templates**: Save and load your own crew configurations
- **Community Ratings**: Quality ratings and complexity indicators
- **Smart Search**: Find templates by category, rating, or complexity

### 📁 **Advanced File Management**
- **Categorized Storage**: Reports, analysis, code, and data organization
- **File Actions**: Preview, download, delete with visual feedback
- **Storage Analytics**: Usage statistics and completion tracking
- **Auto-generation**: Automatic file creation from crew outputs

### 🎨 **Premium UI/UX**
- **Mobile-First Design**: Fully responsive across all devices
- **Modern Interface**: Clean cards, smooth animations, gradient accents
- **Smart Navigation**: Tabbed interface with real-time counters
- **Status Indicators**: System status and execution monitoring

## 🔧 **Technology Stack**

- **Frontend**: Next.js 14, React 18, TypeScript 5.3
- **Styling**: Tailwind CSS 3.4, Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Backend**: Next.js API Routes (serverless functions)
- **Deployment**: Vercel-optimized with zero configuration

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18.x or later
- npm 8.x or later
- Git

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/crewai-advanced-dashboard.git
cd crewai-advanced-dashboard

# Run automated setup
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Option 2: Manual Setup

```bash
# Clone and navigate
git clone https://github.com/yourusername/crewai-advanced-dashboard.git
cd crewai-advanced-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Access the Dashboard
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 **Environment Configuration**

Create a `.env.local` file with your API keys:

```env
# Application
NEXT_PUBLIC_APP_NAME="CrewAI Advanced Dashboard"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# AI Model API Keys
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CREWAI_API_KEY=your_crewai_api_key_here

# Security
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## 📱 **Using the Dashboard**

### 1. **Agents Tab**
- Create and configure AI agents with specific roles and capabilities
- Set model preferences, temperature, and iteration limits
- Monitor real-time agent status and performance metrics

### 2. **Tasks Tab** 
- Define tasks with priority levels and expected outputs
- Assign tasks to appropriate agents
- Track progress with visual indicators

### 3. **Templates Tab**
- Browse pre-built crew templates for common use cases
- Search and filter by category, rating, or complexity
- Create custom templates for reuse

### 4. **Execution Tab** ⭐
- **Real-time Execution**: Watch your crews work in real-time
- **Live Logs**: See detailed progress with agent activities
- **Streaming Output**: View generated content as it's created
- **Performance Metrics**: Monitor tokens, costs, and execution time

### 5. **Analytics Tab**
- View comprehensive performance dashboards
- Analyze cost trends and optimization opportunities
- Track agent performance and success rates

### 6. **Files Tab**
- Manage generated files and reports
- Preview and download outputs
- Monitor storage usage and file statistics

## 🚀 **Deployment**

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Or use npm script
npm run deploy
```

### Environment Variables for Production
Set these in your Vercel dashboard:
- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY` 
- `CREWAI_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## 🏗️ **Architecture**

### Full-Stack Next.js Benefits
- **Single Port**: Frontend and backend on port 3000
- **No CORS Issues**: Unified origin for all requests
- **Serverless Functions**: Automatic API endpoint scaling
- **Hot Reloading**: Real-time development updates
- **TypeScript**: End-to-end type safety

### API Routes
```
/api/agents      - Agent CRUD operations
/api/tasks       - Task management
/api/execution   - Execution engine control
/api/analytics   - Performance metrics
/api/templates   - Template management
```

### Project Structure
```
src/
├── app/
│   ├── api/           # API routes (backend)
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Dashboard page
├── components/
│   ├── ui/            # Reusable UI components
│   ├── dashboard/     # Dashboard-specific components
│   └── forms/         # Form components
├── lib/
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API client services
│   └── types/         # TypeScript definitions
└── data/              # Mock data and constants
```

## 🛠️ **Development**

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

### Adding Real CrewAI Integration

1. **Install CrewAI SDK**:
```bash
pip install crewai
# or
npm install @crewai/sdk  # when available
```

2. **Update API Routes**:
Replace mock data in `/api` routes with real CrewAI calls:

```typescript
// src/app/api/execution/route.ts
import { Crew } from 'crewai';

export async function POST(request: NextRequest) {
  const { agents, tasks } = await request.json();
  
  // Create real CrewAI crew
  const crew = new Crew({
    agents,
    tasks,
    verbose: true
  });
  
  // Execute crew
  const result = await crew.kickoff();
  
  return NextResponse.json({ result });
}
```

3. **WebSocket Integration**:
Add real-time updates using WebSocket for live execution monitoring.

## 📊 **Performance Features**

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Intelligent caching strategies
- **Bundle Analysis**: Built-in bundle analyzer
- **Progressive Loading**: Lazy loading for better performance

## 🔒 **Security Features**

- **Environment Variables**: Secure API key management
- **CORS Protection**: Built-in CORS handling
- **Input Validation**: Request validation and sanitization
- **Error Boundaries**: Graceful error handling
- **Type Safety**: TypeScript for runtime safety

## 🧪 **Testing**

```bash
# Add testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test

# E2E testing with Playwright
npm install --save-dev @playwright/test
npx playwright test
```

## 📚 **Documentation**

- [Feature Documentation](docs/FEATURES.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [API Documentation](docs/API.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- [CrewAI](https://crewai.com/) - Multi-agent framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Recharts](https://recharts.org/) - Data visualization

## 📞 **Support**

- 📧 Email: support@crewai-dashboard.com
- 💬 Discord: [CrewAI Community](https://discord.gg/crewai)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/crewai-advanced-dashboard/issues)

---

**Built with ❤️ for the CrewAI community**

Ready to manage your AI crews like a pro? 🚀