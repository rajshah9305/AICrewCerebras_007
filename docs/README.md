# CrewAI Dashboard - Complete Multi-Agent AI Platform

A comprehensive web-based platform for creating, managing, and executing multi-agent AI workflows using CrewAI and Cerebras LLM integration.

## 🚀 Features

### ✨ **Enhanced User Experience**
- **Professional React-based UI** with real-time streaming
- **Mobile-responsive design** with modern aesthetics
- **Real-time WebSocket updates** for live execution monitoring
- **Advanced template system** with pre-configured workflows

### 🤖 **Agent Management**
- Create and configure AI agents with roles, goals, and backstories
- Support for multiple LLM models (Cerebras Llama variants)
- Configurable agent parameters (temperature, iterations, tools)
- Visual agent performance tracking

### 📋 **Task Assignment**
- Define detailed tasks with expected outputs
- Smart agent-task assignment system
- Priority-based task management
- Context-aware task execution

### 🎯 **Pre-loaded Templates**
1. **Daily Planner Crew** - Time management and productivity optimization
2. **AI Code Assistant Crew** - Complete coding support with generation, debugging, and documentation
3. **Job Application Crew** - Resume writing, cover letters, and job matching
4. **Market Research Crew** - Comprehensive market analysis and competitive intelligence

### 🔄 **Real-time Execution**
- Live streaming execution output
- WebSocket-based progress monitoring
- Detailed execution logs with timestamps
- Automatic file generation and download

### 📊 **Analytics & Monitoring**
- Execution success rates and performance metrics
- Template usage analytics
- File generation tracking
- System health monitoring

## 📁 Project Structure

```
crewai-dashboard/
├── README.md                          # This file
├── setup.sh                          # Complete setup script
├── package.json                      # Project metadata
├── .env.example                      # Environment variables template
├── 
├── backend/                          # FastAPI backend
│   ├── app/
│   │   ├── main.py                   # Main FastAPI application
│   │   ├── crew_executor.py          # CrewAI execution logic
│   │   └── models.py                 # Pydantic data models
│   ├── outputs/                      # Generated files directory
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Backend environment template
│   └── start.sh                      # Backend startup script
├── 
├── frontend/
│   └── index.html                    # Complete React frontend
└── 
└── docs/                             # Documentation
    ├── api.md                        # API documentation
    ├── templates.md                  # Template guide
    └── deployment.md                 # Deployment guide
```

## 🛠️ Quick Setup

### Prerequisites
- **Python 3.9+** (3.10+ recommended)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Cerebras API Key** (provided: `csk-fnxf4wvkvrn58rhmvfctmd2vpn8vwrxxm2c8t3wnf543kxjv`)

### Option 1: Automated Setup (Recommended)

```bash
# Clone or download the project
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

**Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
./start.sh
```

**Frontend:**
```bash
# Simply open frontend/index.html in your browser
open frontend/index.html
```

## 🎯 Usage Guide

### 1. **Choose a Template**
- Browse pre-configured templates in the Templates tab
- Click "Use Template" to load agents and tasks
- Templates include: Daily Planner, Code Assistant, Job Application, Market Research

### 2. **Customize Your Crew**
- **Agents Tab**: Add or modify AI agents with specific roles and capabilities
- **Tasks Tab**: Define tasks with clear descriptions and expected outputs
- **Configuration**: Set execution parameters and model preferences

### 3. **Execute Workflow**
- **Execution Tab**: Enter your topic/objective
- Configure process type (Sequential/Hierarchical)
- Click "Run Crew" to start execution
- Monitor real-time logs and output

### 4. **Download Results**
- **Files Tab**: Access all generated outputs
- Download reports, analyses, and documentation
- Files are automatically timestamped and organized

## 🔧 API Endpoints

### Core Endpoints
- `GET /` - Health check
- `POST /api/v1/execute-crew` - Execute crew workflow
- `GET /api/v1/executions` - List all executions
- `GET /api/v1/executions/{id}` - Get execution details
- `WS /ws` - WebSocket for real-time updates

### Template Management
- `GET /api/v1/templates` - List all templates
- `POST /api/v1/templates` - Save new template
- `GET /api/v1/templates/{id}` - Get specific template
- `DELETE /api/v1/templates/{id}` - Delete template

### File Management
- `GET /api/v1/files` - List generated files
- `GET /api/v1/files/{filename}` - Download file
- `DELETE /api/v1/files/{filename}` - Delete file

### Analytics
- `GET /api/v1/analytics` - Get dashboard analytics

## 🤖 Supported Models

### Cerebras Models (Recommended)
- **llama-3.3-70b** - High performance, balanced cost
- **llama-4-maverick-17b-128e-instruct** - Ultra-fast inference
- **llama-4-scout-17b-16e-instruct** - Optimized for quick tasks

### Model Characteristics
| Model | Speed | Context | Best For |
|-------|-------|---------|----------|
| Llama 3.3 70B | Fast | 8K | General tasks, analysis |
| Llama 4 Maverick | Very Fast | 128K | Long documents, research |
| Llama 4 Scout | Ultra Fast | 16K | Quick responses, coding |

## 📝 Example Use Cases

### 1. **Daily Planning**
```
Topic: "Plan my day for maximum productivity focusing on project deadlines"
Template: Daily Planner Crew
Output: Structured schedule with time blocks and priority tasks
```

### 2. **Code Development**
```
Topic: "Create a Python REST API for user authentication with JWT"
Template: AI Code Assistant Crew
Output: Complete code, documentation, and tests
```

### 3. **Job Applications**
```
Topic: "Apply for Senior Software Engineer role at tech startup"
Template: Job Application Crew
Output: Tailored resume, cover letter, and application strategy
```

### 4. **Market Research**
```
Topic: "Analyze the AI chatbot market for business opportunities"
Template: Market Research Crew
Output: Comprehensive market analysis with recommendations
```

## 🔒 Security & Configuration

### Environment Variables
```bash
# Required
CEREBRAS_API_KEY=your_cerebras_api_key_here
SERPER_API_KEY=your_serper_api_key_here

# Optional
CEREBRAS_BASE_URL=https://api.cerebras.ai/v1
ALLOWED_ORIGINS=*
MAX_REQUESTS_PER_MINUTE=60
MAX_CONCURRENT_EXECUTIONS=5
```

### API Keys
- **Cerebras API**: Sign up at [cloud.cerebras.ai](https://cloud.cerebras.ai)
- **Serper API**: Get key at [serper.dev](https://serper.dev) for web search tools

## 📊 Performance & Monitoring

### Real-time Metrics
- **Execution Status**: Running, Completed, Failed
- **Token Usage**: Track LLM token consumption
- **Response Times**: Monitor agent performance
- **Success Rates**: Overall system reliability

### File Management
- **Automatic Generation**: Reports saved as Markdown
- **Retention Policy**: Configurable file retention
- **Download Tracking**: Monitor file access

## 🚀 Deployment Options

### Local Development
```bash
# Backend
cd backend && ./start.sh

# Frontend
open frontend/index.html
```

### Production Deployment

#### Option 1: Docker (Recommended)
```dockerfile
# Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY backend/ .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Option 2: Cloud Platforms
- **Heroku**: Deploy backend with Procfile
- **Railway**: One-click deployment
- **Render**: Automatic builds from Git
- **DigitalOcean**: App Platform deployment

### Frontend Hosting
- **Netlify**: Drag-and-drop frontend deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: Bucket hosting with CloudFront

## 🛡️ Security Best Practices

### API Security
- **CORS Configuration**: Restrict origins in production
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize all user inputs
- **Error Handling**: Don't expose sensitive information

### Data Protection
- **API Key Management**: Use environment variables
- **File Permissions**: Restrict outputs directory access
- **Session Management**: Implement proper user sessions
- **Audit Logging**: Track all system activities

## 🔧 Customization Guide

### Adding New Templates
```python
# Create new template in frontend
const newTemplate = {
    id: 'custom-template',
    name: 'Custom Workflow',
    description: 'Your custom multi-agent workflow',
    category: 'Custom',
    agents: [...],
    tasks: [...]
};
```

### Custom Agent Tools
```python
# Add new tools in crew_executor.py
def _get_tools(self, tool_names):
    tools = []
    for tool_name in tool_names:
        if tool_name == "custom_tool":
            from custom_tools import CustomTool
            tools.append(CustomTool())
    return tools
```

### Extending API
```python
# Add new endpoints in main.py
@app.get("/api/v1/custom-endpoint")
async def custom_endpoint():
    return {"message": "Custom functionality"}
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Backend Won't Start**
```bash
# Check Python version
python --version  # Should be 3.9+

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check port availability
lsof -i :8000
```

#### 2. **WebSocket Connection Failed**
- Ensure backend is running on correct port
- Check CORS configuration
- Verify firewall settings

#### 3. **Execution Errors**
- Verify Cerebras API key is valid
- Check internet connection for tool access
- Review execution logs for specific errors

#### 4. **File Download Issues**
- Ensure outputs directory has write permissions
- Check available disk space
- Verify file generation completed successfully

### Error Codes
- **400**: Bad request - Check input parameters
- **401**: Unauthorized - Verify API keys
- **500**: Server error - Check backend logs
- **503**: Service unavailable - Server overloaded

## 📈 Performance Optimization

### Backend Optimization
- **Async Operations**: All I/O operations are async
- **Connection Pooling**: Reuse HTTP connections
- **Caching**: Cache template data and configurations
- **Load Balancing**: Use multiple backend instances

### Frontend Optimization
- **Code Splitting**: Load components on demand
- **Lazy Loading**: Defer non-critical resources
- **Caching**: Browser caching for static assets
- **Compression**: Gzip/Brotli compression

## 🤝 Contributing

### Development Setup
```bash
# Fork the repository
git clone https://github.com/yourusername/crewai-dashboard.git
cd crewai-dashboard

# Setup development environment
./setup.sh

# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
cd backend && python -m pytest tests/

# Submit pull request
```

### Code Standards
- **Python**: Follow PEP 8 with Black formatting
- **JavaScript**: Use ES6+ features, consistent naming
- **Documentation**: Update README and API docs
- **Testing**: Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Check this README and API docs
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact support@crewai-dashboard.com

### Community
- **Discord**: Join our developer community
- **Twitter**: Follow @CrewAIDashboard for updates
- **Blog**: Read tutorials at blog.crewai-dashboard.com

## 🙏 Acknowledgments

### Technologies Used
- **CrewAI**: Multi-agent orchestration framework
- **Cerebras**: High-performance LLM inference
- **FastAPI**: Modern Python web framework
- **React**: Frontend user interface library
- **WebSockets**: Real-time communication
- **Tailwind CSS**: Utility-first CSS framework

### Special Thanks
- CrewAI team for the amazing framework
- Cerebras for high-performance AI inference
- Open source community for tools and libraries

---

**Built with ❤️ by the CrewAI Dashboard team**

*Transform your workflows with the power of multi-agent AI*