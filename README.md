# 🚀 CrewAI Dashboard - Production Ready

A complete production-ready dashboard for managing multi-agent AI workflows with real-time execution monitoring.

## ✨ Features

- **🤖 Multi-Agent Management** - Create, configure, and monitor AI agents
- **⚡ Real-time Execution** - Live streaming output and progress tracking
- **📊 Analytics Dashboard** - Performance metrics and cost tracking
- **🔄 Task Management** - Priority-based task scheduling
- **📱 Mobile Responsive** - Works on all devices
- **🚀 Production Ready** - No placeholders, fully functional

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation

```bash
git clone https://github.com/rajshah9305/AICrewCerebras_007.git
cd AICrewCerebras_007
npm install
npm run dev
```

### Access Dashboard
Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Real-time**: Server-Sent Events (SSE)
- **Deployment**: Vercel, Docker

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/          # Backend API routes
│   │   │   ├── agents/   # Agent management
│   │   │   ├── tasks/    # Task management
│   │   │   └── execute/  # Workflow execution
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Main dashboard
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose
├── vercel.json          # Vercel deployment
└── package.json         # Dependencies
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker-compose up --build
```

### Manual
```bash
npm run build
npm start
```

## 📊 API Endpoints

- `GET /api/agents` - Fetch all agents
- `POST /api/agents` - Create new agent
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `POST /api/execute` - Start workflow execution (streaming)

## 🔧 Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=production
```

## 📱 Features Overview

### Dashboard
- Real-time agent status monitoring
- Task execution progress
- Performance metrics
- Cost tracking

### Execution Engine
- Live streaming output
- Progress tracking
- Agent coordination
- Error handling

### Agent Management
- Create and configure agents
- Monitor performance
- Track costs and usage

### Task Management
- Priority-based scheduling
- Status tracking
- Assignment management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Submit pull request

## 📄 License

MIT License

---

Built with ❤️ using Next.js and TypeScript