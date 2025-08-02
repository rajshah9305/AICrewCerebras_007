#!/bin/bash
# setup.sh - Complete setup script for CrewAI Dashboard

echo "🔧 Setting up CrewAI Dashboard..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}$1${NC}"
}

print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Check Python version
print_header "Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version | cut -d " " -f 2)
    print_status "Python $PYTHON_VERSION found"
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_VERSION=$(python --version | cut -d " " -f 2)
    print_status "Python $PYTHON_VERSION found"
    PYTHON_CMD="python"
else
    print_error "Python not found. Please install Python 3.9+ first."
    exit 1
fi

# Check pip
print_header "Checking pip installation..."
if command -v pip3 &> /dev/null; then
    print_status "pip3 found"
    PIP_CMD="pip3"
elif command -v pip &> /dev/null; then
    print_status "pip found"
    PIP_CMD="pip"
else
    print_error "pip not found. Please install pip first."
    exit 1
fi

# Create project structure
print_header "Creating project structure..."
mkdir -p backend/app
mkdir -p backend/outputs
mkdir -p backend/tests
mkdir -p frontend
print_status "Directories created"

# Setup backend
print_header "Setting up backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    print_status "Creating virtual environment..."
    $PYTHON_CMD -m venv venv
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
print_status "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
print_status "Installing Python dependencies..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
else
    print_warning "requirements.txt not found. Installing basic dependencies..."
    pip install fastapi uvicorn websockets aiofiles python-multipart
    pip install crewai crewai-tools cerebras-cloud-sdk
fi

# Create .env file
if [ ! -f ".env" ]; then
    print_status "Creating .env file..."
    cp .env.example .env 2>/dev/null || cat > .env << EOF
CEREBRAS_API_KEY=csk-fnxf4wvkvrn58rhmvfctmd2vpn8vwrxxm2c8t3wnf543kxjv
CEREBRAS_BASE_URL=https://api.cerebras.ai/v1
SERPER_API_KEY=d4dfd183e6323db6600c32b5e3b8af3d66f10c99
APP_NAME=CrewAI Dashboard
ENVIRONMENT=development
ALLOWED_ORIGINS=*
EOF
    print_status ".env file created with default values"
fi

# Make start script executable
chmod +x start.sh 2>/dev/null

cd ..

print_header "Setup Complete! 🎉"
echo ""
print_status "To start the application:"
echo "  1. Backend: cd backend && ./start.sh"
echo "  2. Frontend: Open frontend/index.html in your browser"
echo ""
print_status "API will be available at: http://localhost:8000"
print_status "API docs at: http://localhost:8000/docs"
print_status "WebSocket at: ws://localhost:8000/ws"
echo ""
print_warning "Make sure to configure your API keys in backend/.env if needed"