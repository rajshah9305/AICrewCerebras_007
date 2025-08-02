#!/bin/bash
# backend/start.sh

echo "🚀 Starting CrewAI Dashboard Backend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    print_error "Virtual environment not found. Creating one..."
    python -m venv venv
    if [ $? -eq 0 ]; then
        print_status "Virtual environment created successfully"
    else
        print_error "Failed to create virtual environment"
        exit 1
    fi
fi

# Activate virtual environment
print_status "Activating virtual environment..."
source venv/bin/activate

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Copying from .env.example..."
    cp .env.example .env
    print_warning "Please edit .env file and add your API keys if needed"
fi

# Install/update dependencies
print_status "Installing dependencies..."
pip install -r requirements.txt

# Create outputs directory
mkdir -p outputs
print_status "Created outputs directory"

# Check if API key is configured
if grep -q "csk-fnxf4wvkvrn58rhmvfctmd2vpn8vwrxxm2c8t3wnf543kxjv" .env; then
    print_status "Cerebras API key configured"
else
    print_warning "Please configure your Cerebras API key in .env file"
fi

# Start the server
print_status "Starting FastAPI server on http://localhost:8000"
print_status "API documentation available at http://localhost:8000/docs"
print_status "WebSocket endpoint at ws://localhost:8000/ws"
echo ""
print_warning "Press Ctrl+C to stop the server"
echo ""

# Check if port 8000 is already in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    print_warning "Port 8000 is already in use. Trying port 8001..."
    cd app && python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload
else
    cd app && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
fi