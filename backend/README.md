# Backend - CrewAI Dashboard API

FastAPI backend for the CrewAI Dashboard with WebSocket support and multi-agent workflow execution.

## 🚀 Quick Start

```bash
# Setup virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Start server
uvicorn app.main:app --reload
```

## 📡 API Endpoints

- `GET /health` - Health check
- `POST /api/v1/execute-crew` - Execute crew workflow
- `GET /api/v1/executions` - List executions
- `WebSocket /ws` - Real-time updates

## 📚 API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation.