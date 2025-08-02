#!/bin/bash

# CrewAI Advanced Dashboard - Setup Script
# This script automates the complete setup process

set -e  # Exit on any error

echo "🚀 CrewAI Advanced Dashboard Setup"
echo "==================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        print_status "Please install Node.js from https://nodejs.org/"
        print_status "Recommended version: 18.x or later"
        exit 1
    fi
    
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
    
    # Check Node.js version (must be 18+)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 18 ]; then
        print_warning "Node.js version $NODE_VERSION detected"
        print_warning "Recommended: Node.js 18.x or later for best compatibility"
    fi
}

# Check if npm is available
check_npm() {
    print_status "Checking npm..."
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed!"
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    print_success "npm found: $NPM_VERSION"
}

# Install dependencies
install_dependencies() {
    print_status "Installing project dependencies..."
    
    if [ -f "package-lock.json" ]; then
        print_status "Found package-lock.json, using npm ci for faster install..."
        npm ci
    else
        print_status "Installing dependencies with npm install..."
        npm install
    fi
    
    print_success "Dependencies installed successfully!"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.example" ]; then
            cp .env.example .env.local
            print_success "Created .env.local from .env.example"
        else
            print_status "Creating .env.local file..."
            cat > .env.local << 'EOF'
# Application
NEXT_PUBLIC_APP_NAME="CrewAI Advanced Dashboard"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# CrewAI Configuration (add your keys here)
CREWAI_API_KEY=your_crewai_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database (for future expansion)
DATABASE_URL=postgresql://username:password@localhost:5432/crewai_dashboard

# Security
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
EOF
            print_success "Created .env.local file"
        fi
    else
        print_warning ".env.local already exists, skipping..."
    fi
    
    print_status "Please update .env.local with your actual API keys"
}

# Create necessary directories
create_directories() {
    print_status "Creating project directories..."
    
    directories=(
        "src/app/api/agents"
        "src/app/api/tasks"
        "src/app/api/execution"
        "src/app/api/analytics"
        "src/components/ui"
        "src/components/dashboard"
        "src/components/forms"
        "src/lib/hooks"
        "src/lib/services"
        "src/lib/types"
        "src/data"
        "docs"
        "public"
    )
    
    for dir in "${directories[@]}"; do
        if [ ! -d "$dir" ]; then
            mkdir -p "$dir"
            print_success "Created directory: $dir"
        fi
    done
}

# Run type checking
run_type_check() {
    print_status "Running TypeScript type checking..."
    
    if npm run type-check; then
        print_success "TypeScript compilation successful!"
    else
        print_warning "TypeScript compilation warnings detected"
        print_status "You can fix these later or continue with the setup"
    fi
}

# Test development server
test_dev_server() {
    print_status "Testing development server startup..."
    
    # Start dev server in background
    npm run dev &
    DEV_PID=$!
    
    # Wait a bit for server to start
    sleep 5
    
    # Test if server is responding
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Development server is running successfully!"
        print_status "You can access the dashboard at: http://localhost:3000"
    else
        print_warning "Development server test failed"
        print_status "You can start it manually with: npm run dev"
    fi
    
    # Stop the dev server
    kill $DEV_PID 2>/dev/null || true
    wait $DEV_PID 2>/dev/null || true
}

# Setup Git hooks (optional)
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
    if [ -d ".git" ]; then
        # Create pre-commit hook for linting
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
echo "Running pre-commit checks..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "Linting failed. Please fix the issues before committing."
    exit 1
fi

# Run type checking
npm run type-check
if [ $? -ne 0 ]; then
    echo "Type checking failed. Please fix the issues before committing."
    exit 1
fi

echo "Pre-commit checks passed!"
EOF
        chmod +x .git/hooks/pre-commit
        print_success "Git pre-commit hook installed"
    else
        print_status "Not a Git repository, skipping Git hooks setup"
    fi
}

# Display next steps
show_next_steps() {
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "==============================="
    echo ""
    echo -e "${GREEN}Next steps:${NC}"
    echo ""
    echo "1. Update your API keys in .env.local:"
    echo "   - OPENAI_API_KEY"
    echo "   - ANTHROPIC_API_KEY"
    echo "   - CREWAI_API_KEY (when available)"
    echo ""
    echo "2. Start the development server:"
    echo -e "   ${BLUE}npm run dev${NC}"
    echo ""
    echo "3. Open your browser and navigate to:"
    echo -e "   ${BLUE}http://localhost:3000${NC}"
    echo ""
    echo "4. Build for production:"
    echo -e "   ${BLUE}npm run build${NC}"
    echo ""
    echo "5. Deploy to Vercel:"
    echo -e "   ${BLUE}npm run deploy${NC}"
    echo ""
    echo -e "${GREEN}Useful commands:${NC}"
    echo -e "  ${BLUE}npm run dev${NC}        - Start development server"
    echo -e "  ${BLUE}npm run build${NC}      - Build for production"
    echo -e "  ${BLUE}npm run start${NC}      - Start production server"
    echo -e "  ${BLUE}npm run lint${NC}       - Run ESLint"
    echo -e "  ${BLUE}npm run type-check${NC} - Run TypeScript checking"
    echo ""
    echo -e "${YELLOW}Documentation:${NC}"
    echo "  - README.md - Project overview and instructions"
    echo "  - docs/FEATURES.md - Feature documentation"
    echo "  - docs/DEPLOYMENT.md - Deployment guide"
    echo ""
    echo "Happy coding! 🚀"
}

# Main setup process
main() {
    echo "Starting automated setup..."
    echo ""
    
    # Run all setup steps
    check_node
    check_npm
    create_directories
    install_dependencies
    setup_environment
    run_type_check
    setup_git_hooks
    
    # Optional: Test dev server
    read -p "Would you like to test the development server? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        test_dev_server
    fi
    
    show_next_steps
}

# Handle script interruption
trap 'print_error "Setup interrupted!"; exit 1' INT

# Run main function
main "$@"