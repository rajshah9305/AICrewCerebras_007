                </div>
              )}
            </Card>

            {/* Execution Logs */}
            {executionLogs.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary-600" />
                    Live Execution Logs
                  </h4>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {executionLogs.map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          log.type === 'success' ? 'bg-success-500' :
                          log.type === 'warning' ? 'bg-warning-500' :
                          log.type === 'error' ? 'bg-danger-500' :
                          'bg-primary-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{log.message}</p>
                            <span className="text-xs text-gray-500">
                              {log.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          {log.agent && (
                            <p className="text-xs text-gray-600 mt-1">Agent: {log.agent}</p>
                          )}
                          {(log.tokens || log.cost) && (
                            <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                              {log.tokens && <span>Tokens: {log.tokens.toLocaleString()}</span>}
                              {log.cost && <span>Cost: ${log.cost.toFixed(2)}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary-600" />
                    Streaming Output
                  </h4>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{streamingOutput || 'Waiting for execution to start...'}</pre>
                    {isExecuting && (
                      <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Executions</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalExecutions}</p>
                  </div>
                  <Activity className="w-8 h-8 text-primary-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-success-600">+12.5%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.successRate}%</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
                  <span className="text-success-600">+2.1%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.avgDuration}</p>
                  </div>
                  <Clock className="w-8 h-8 text-warning-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-danger-500 mr-1 rotate-180" />
                  <span className="text-danger-600">-8.3%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Cost</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalCost}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-danger-600" />
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-success-500 mr-1 rotate-180" />
                  <span className="text-success-600">-15.2%</span>
                  <span className="text-gray-500 ml-1">vs last month</span>
                </div>
              </Card>
            </div>

            {/* Agent Performance */}
            <Card>
              <h4 className="font-semibold mb-4">Agent Performance Overview</h4>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{agent.name}</h5>
                        <p className="text-sm text-gray-600">{agent.tasksCompleted} tasks completed</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{agent.performanceScore}%</p>
                        <p className="text-xs text-gray-500">Performance</p>
                      </div>
                      <Progress value={agent.performanceScore} className="w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Cost Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h4 className="font-semibold mb-4">Token Usage Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Claude-3.5-Sonnet</span>
                    <span className="font-medium">1,247,392 tokens</span>
                  </div>
                  <Progress value={65} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">GPT-4-Turbo</span>
                    <span className="font-medium">892,156 tokens</span>
                  </div>
                  <Progress value={45} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Llama-3.1-70B</span>
                    <span className="font-medium">707,844 tokens</span>
                  </div>
                  <Progress value={35} />
                </div>
              </Card>

              <Card>
                <h4 className="font-semibold mb-4">Weekly Trends</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Executions</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-success-500" />
                      <span className="font-medium text-success-600">+18%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-success-500" />
                      <span className="font-medium text-success-600">+2.3%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Cost</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-danger-500 rotate-180" />
                      <span className="font-medium text-success-600">-12%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="space-y-6">
            {/* File Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Files</p>
                    <p className="text-2xl font-bold text-gray-900">{analyticsData.totalFiles}</p>
                  </div>
                  <FolderOpen className="w-8 h-8 text-primary-600" />
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Storage Used</p>
                    <p className="text-2xl font-bold text-gray-900">15.7 MB</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-warning-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-warning-600" />
                  </div>
                </div>
                <Progress value={35} className="mt-2" />
              </Card>

              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{files.filter(f => f.status === 'completed').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-success-600" />
                </div>
              </Card>
            </div>

            {/* Files List */}
            <Card>
              <h4 className="font-semibold mb-4">Generated Files</h4>
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        file.type === 'report' ? 'bg-primary-100 text-primary-600' :
                        file.type === 'analysis' ? 'bg-success-100 text-success-600' :
                        file.type === 'code' ? 'bg-warning-100 text-warning-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">{file.name}</h5>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{file.size}</span>
                          <span>{file.createdAt.toLocaleDateString()}</span>
                          <Badge variant={file.status === 'completed' ? 'success' : file.status === 'processing' ? 'warning' : 'danger'}>
                            {file.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-danger-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>

        {/* Floating Action Button */}
        {!isExecuting && agents.length > 0 && tasks.length > 0 && (
          <button
            onClick={simulateExecution}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-strong hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          >
            <Play className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
    );
  };

  export default CrewAIDashboard;import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Users, 
  CheckSquare, 
  FileText, 
  Activity, 
  BarChart3, 
  FolderOpen,
  Settings,
  Zap,
  Brain,
  Rocket,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
  Download,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

// Types
interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  model: string;
  temperature: number;
  maxIterations: number;
  tools: string[];
  status: 'idle' | 'active' | 'busy';
  performanceScore: number;
  tasksCompleted: number;
}

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  outputFormat: 'text' | 'markdown' | 'json' | 'csv' | 'pdf';
  assignedAgent?: string;
  progress: number;
  context: string;
  expectedOutput: string;
}

interface Template {
  id: string;
  name: string;
  category: 'research' | 'marketing' | 'development' | 'custom';
  description: string;
  agentCount: number;
  taskCount: number;
  rating: number;
  featured: boolean;
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

interface ExecutionLog {
  id: string;
  timestamp: Date;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  agent?: string;
  tokens?: number;
  cost?: number;
}

interface FileItem {
  id: string;
  name: string;
  type: 'report' | 'analysis' | 'code' | 'data';
  size: string;
  createdAt: Date;
  status: 'completed' | 'processing' | 'failed';
}

// Sample Data
const sampleAgents: Agent[] = [
  {
    id: '1',
    name: 'Market Researcher',
    role: 'Senior Market Research Analyst',
    goal: 'Conduct comprehensive market analysis and identify growth opportunities',
    backstory: 'Expert in market research with 10+ years of experience in analyzing industry trends and consumer behavior.',
    model: 'Claude-3.5-Sonnet',
    temperature: 0.7,
    maxIterations: 3,
    tools: ['web_search', 'data_analysis', 'report_generator'],
    status: 'idle',
    performanceScore: 94,
    tasksCompleted: 127
  },
  {
    id: '2',
    name: 'Content Strategist',
    role: 'Digital Content Strategy Expert',
    goal: 'Create compelling content strategies that drive engagement and conversions',
    backstory: 'Award-winning content strategist with expertise in multi-channel marketing campaigns.',
    model: 'GPT-4-Turbo',
    temperature: 0.8,
    maxIterations: 2,
    tools: ['content_generator', 'seo_optimizer', 'social_media'],
    status: 'active',
    performanceScore: 89,
    tasksCompleted: 98
  },
  {
    id: '3',
    name: 'Data Scientist',
    role: 'Senior Data Science Specialist',
    goal: 'Extract actionable insights from complex datasets and build predictive models',
    backstory: 'PhD in Data Science with specialization in machine learning and statistical analysis.',
    model: 'Llama-3.1-70B',
    temperature: 0.5,
    maxIterations: 4,
    tools: ['python_interpreter', 'data_visualization', 'ml_models'],
    status: 'busy',
    performanceScore: 97,
    tasksCompleted: 156
  }
];

const sampleTasks: Task[] = [
  {
    id: '1',
    name: 'Q4 Market Analysis',
    description: 'Analyze Q4 market trends and competitor positioning for strategic planning',
    priority: 'urgent',
    outputFormat: 'pdf',
    assignedAgent: '1',
    progress: 75,
    context: 'Focus on SaaS market segment with emphasis on emerging technologies',
    expectedOutput: 'Comprehensive 20-page market analysis report with strategic recommendations'
  },
  {
    id: '2',
    name: 'Content Calendar Development',
    description: 'Create a comprehensive content calendar for Q1 marketing campaigns',
    priority: 'high',
    outputFormat: 'markdown',
    assignedAgent: '2',
    progress: 40,
    context: 'Include social media, blog posts, and email marketing content',
    expectedOutput: 'Detailed content calendar with publishing schedule and content themes'
  },
  {
    id: '3',
    name: 'Customer Churn Prediction',
    description: 'Build ML model to predict customer churn and identify risk factors',
    priority: 'medium',
    outputFormat: 'json',
    assignedAgent: '3',
    progress: 20,
    context: 'Use historical customer data and behavioral patterns',
    expectedOutput: 'Trained ML model with performance metrics and feature importance analysis'
  }
];

const sampleTemplates: Template[] = [
  {
    id: '1',
    name: 'Market Research Team',
    category: 'research',
    description: 'Complete market research crew with analyst, researcher, and report writer',
    agentCount: 3,
    taskCount: 5,
    rating: 4.8,
    featured: true,
    complexity: 'intermediate'
  },
  {
    id: '2',
    name: 'Content Creation Squad',
    category: 'marketing',
    description: 'End-to-end content creation team for blogs, social media, and campaigns',
    agentCount: 4,
    taskCount: 7,
    rating: 4.6,
    featured: true,
    complexity: 'beginner'
  },
  {
    id: '3',
    name: 'Code Review Panel',
    category: 'development',
    description: 'Expert code review team for quality assurance and best practices',
    agentCount: 2,
    taskCount: 4,
    rating: 4.9,
    featured: false,
    complexity: 'advanced'
  }
];

const sampleFiles: FileItem[] = [
  {
    id: '1',
    name: 'Q4_Market_Analysis_Report.pdf',
    type: 'report',
    size: '2.4 MB',
    createdAt: new Date('2024-01-15'),
    status: 'completed'
  },
  {
    id: '2',
    name: 'Customer_Segmentation_Analysis.json',
    type: 'analysis',
    size: '856 KB',
    createdAt: new Date('2024-01-14'),
    status: 'completed'
  },
  {
    id: '3',
    name: 'Content_Strategy_Framework.md',
    type: 'report',
    size: '124 KB',
    createdAt: new Date('2024-01-13'),
    status: 'processing'
  }
];

// UI Components
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-soft p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '' 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    danger: 'bg-danger-100 text-danger-800',
    info: 'bg-primary-100 text-primary-800'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Progress = ({ value, className = '' }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    ></div>
  </div>
);

const Input = ({ 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  className = '' 
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
  />
);

const Select = ({ 
  value, 
  onChange, 
  options, 
  placeholder,
  className = '' 
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const Textarea = ({ 
  placeholder, 
  value, 
  onChange, 
  rows = 3,
  className = '' 
}: {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  className?: string;
}) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${className}`}
  />
);

// Main Dashboard Component
const CrewAIDashboard = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState<Agent[]>(sampleAgents);
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [templates] = useState<Template[]>(sampleTemplates);
  const [files] = useState<FileItem[]>(sampleFiles);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [streamingOutput, setStreamingOutput] = useState('');
  
  // Form states
  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    goal: '',
    backstory: '',
    model: 'Claude-3.5-Sonnet',
    temperature: 0.7,
    maxIterations: 3,
    tools: [] as string[]
  });
  
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    priority: 'medium' as const,
    outputFormat: 'text' as const,
    assignedAgent: '',
    context: '',
    expectedOutput: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Analytics data
  const analyticsData = {
    totalExecutions: 342,
    successRate: 94.2,
    avgDuration: '2.4 min',
    totalCost: '$127.50',
    tokenUsage: 2847392,
    activeAgents: agents.filter(a => a.status !== 'idle').length,
    completedTasks: tasks.filter(t => t.progress === 100).length,
    totalFiles: files.length
  };

  // Execution simulation
  const simulateExecution = async () => {
    setIsExecuting(true);
    setExecutionProgress(0);
    setExecutionLogs([]);
    setStreamingOutput('');
    
    const steps = [
      { message: 'Initializing CrewAI execution engine...', type: 'info' as const, delay: 500 },
      { message: 'Loading agent configurations and tools', type: 'info' as const, delay: 700 },
      { message: 'Market Researcher: Starting Q4 market analysis', type: 'info' as const, agent: 'Market Researcher', delay: 800 },
      { message: 'Performing web searches for market data...', type: 'info' as const, delay: 900 },
      { message: 'Found 247 relevant market reports and articles', type: 'success' as const, tokens: 1250, delay: 1000 },
      { message: 'Content Strategist: Beginning content strategy development', type: 'info' as const, agent: 'Content Strategist', delay: 1200 },
      { message: 'Analyzing competitor content strategies...', type: 'info' as const, delay: 800 },
      { message: 'Generated content framework with 12 key themes', type: 'success' as const, tokens: 890, delay: 1100 },
      { message: 'Data Scientist: Processing customer behavior datasets', type: 'info' as const, agent: 'Data Scientist', delay: 1000 },
      { message: 'Running machine learning algorithms...', type: 'info' as const, delay: 1300 },
      { message: 'Model training completed with 94.2% accuracy', type: 'success' as const, tokens: 2100, delay: 900 },
      { message: 'Cross-agent collaboration: Sharing insights...', type: 'info' as const, delay: 600 },
      { message: 'Market Researcher: Integrating predictive analytics', type: 'info' as const, agent: 'Market Researcher', delay: 800 },
      { message: 'Content Strategist: Aligning content with market trends', type: 'info' as const, agent: 'Content Strategist', delay: 700 },
      { message: 'Generating comprehensive business intelligence report...', type: 'info' as const, delay: 1000 },
      { message: 'Report generation completed successfully!', type: 'success' as const, tokens: 3200, cost: 2.45, delay: 500 }
    ];

    const outputs = [
      '\n# Executive Summary\n\nOur comprehensive Q4 analysis reveals significant opportunities in the emerging AI-driven SaaS market...',
      '\n\n## Market Dynamics\n\n• **Market Size**: The global SaaS market is projected to reach $720B by 2028\n• **Growth Rate**: 18.7% CAGR driven by digital transformation\n• **Key Drivers**: Remote work adoption, cloud migration, AI integration',
      '\n\n## Competitive Landscape\n\n### Leading Players\n1. **Salesforce** - Market leader with 19.8% share\n2. **Microsoft** - Strong growth in productivity suite\n3. **Adobe** - Creative cloud dominance\n4. **ServiceNow** - Enterprise workflow leader',
      '\n\n## Customer Insights\n\n**Churn Risk Analysis:**\n• 23% of customers show early warning signs\n• Primary factors: Poor onboarding (34%), Lack of feature adoption (28%)\n• Recommended interventions: Enhanced support, Feature education',
      '\n\n## Content Strategy Recommendations\n\n### Q1 2025 Content Themes\n1. **AI-Powered Workflows** - 15 pieces\n2. **Digital Transformation Stories** - 12 pieces\n3. **ROI Case Studies** - 8 pieces\n4. **Product Deep Dives** - 10 pieces',
      '\n\n## Strategic Recommendations\n\n### Immediate Actions (Next 30 Days)\n1. Launch AI feature beta program\n2. Implement proactive churn prevention\n3. Expand enterprise sales team\n4. Enhance onboarding experience',
      '\n\n### Medium-term Goals (Q1-Q2 2025)\n• Achieve 25% market share in mid-market segment\n• Reduce customer churn to <8%\n• Launch 3 new AI-powered features\n• Expand to 2 new geographic markets',
      '\n\n## Financial Projections\n\n**Revenue Forecast:**\n• Q1 2025: $12.4M (+22% YoY)\n• Q2 2025: $14.1M (+27% YoY)\n• Q3 2025: $15.8M (+31% YoY)\n• Q4 2025: $17.2M (+35% YoY)',
      '\n\n---\n\n*Report generated by CrewAI Advanced Analytics Team*\n*Confidence Level: 94.2% | Data Sources: 247 | Analysis Depth: Comprehensive*'
    ];

    let currentOutput = '';
    let logIndex = 0;
    let outputIndex = 0;

    const addLog = () => {
      if (logIndex < steps.length) {
        const step = steps[logIndex];
        const newLog: ExecutionLog = {
          id: Date.now().toString(),
          timestamp: new Date(),
          type: step.type,
          message: step.message,
          agent: step.agent,
          tokens: step.tokens,
          cost: step.cost
        };
        
        setExecutionLogs(prev => [...prev, newLog]);
        setExecutionProgress((logIndex + 1) / steps.length * 100);
        
        // Add streaming output
        if (outputIndex < outputs.length && logIndex > 4) {
          currentOutput += outputs[outputIndex];
          setStreamingOutput(currentOutput);
          outputIndex++;
        }
        
        logIndex++;
        setTimeout(addLog, step.delay);
      } else {
        setIsExecuting(false);
        // Update agent statuses
        setAgents(prev => prev.map(agent => ({ ...agent, status: 'idle' as const })));
      }
    };

    addLog();
  };

  const addAgent = () => {
    if (newAgent.name && newAgent.role) {
      const agent: Agent = {
        id: Date.now().toString(),
        ...newAgent,
        status: 'idle',
        performanceScore: Math.floor(Math.random() * 20) + 80,
        tasksCompleted: Math.floor(Math.random() * 50)
      };
      setAgents(prev => [...prev, agent]);
      setNewAgent({
        name: '',
        role: '',
        goal: '',
        backstory: '',
        model: 'Claude-3.5-Sonnet',
        temperature: 0.7,
        maxIterations: 3,
        tools: []
      });
    }
  };

  const addTask = () => {
    if (newTask.name && newTask.description) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        progress: 0
      };
      setTasks(prev => [...prev, task]);
      setNewTask({
        name: '',
        description: '',
        priority: 'medium',
        outputFormat: 'text',
        assignedAgent: '',
        context: '',
        expectedOutput: ''
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-success-100 text-success-800';
      case 'busy': return 'bg-warning-100 text-warning-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-danger-100 text-danger-800';
      case 'high': return 'bg-warning-100 text-warning-800';
      case 'medium': return 'bg-primary-100 text-primary-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const tabCounts = {
    agents: agents.length,
    tasks: tasks.length,
    templates: templates.length,
    files: files.length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Rocket className="w-8 h-8 text-primary-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                CrewAI Dashboard
              </h1>
            </div>

        {/* Tab Content */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            {/* Agent Form */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-primary-600" />
                Add New Agent
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Agent Name"
                  value={newAgent.name}
                  onChange={(value) => setNewAgent(prev => ({ ...prev, name: value }))}
                />
                <Input
                  placeholder="Role"
                  value={newAgent.role}
                  onChange={(value) => setNewAgent(prev => ({ ...prev, role: value }))}
                />
                <Textarea
                  placeholder="Goal"
                  value={newAgent.goal}
                  onChange={(value) => setNewAgent(prev => ({ ...prev, goal: value }))}
                />
                <Textarea
                  placeholder="Backstory"
                  value={newAgent.backstory}
                  onChange={(value) => setNewAgent(prev => ({ ...prev, backstory: value }))}
                />
                <Select
                  value={newAgent.model}
                  onChange={(value) => setNewAgent(prev => ({ ...prev, model: value }))}
                  options={[
                    { value: 'Claude-3.5-Sonnet', label: 'Claude-3.5-Sonnet' },
                    { value: 'GPT-4-Turbo', label: 'GPT-4-Turbo' },
                    { value: 'Llama-3.1-70B', label: 'Llama-3.1-70B' },
                    { value: 'Mistral-Large', label: 'Mistral-Large' }
                  ]}
                />
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
                    <Input
                      type="number"
                      value={newAgent.temperature.toString()}
                      onChange={(value) => setNewAgent(prev => ({ ...prev, temperature: parseFloat(value) || 0 }))}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Iterations</label>
                    <Input
                      type="number"
                      value={newAgent.maxIterations.toString()}
                      onChange={(value) => setNewAgent(prev => ({ ...prev, maxIterations: parseInt(value) || 1 }))}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={addAgent}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Agent
                </Button>
              </div>
            </Card>

            {/* Agents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <Card key={agent.id} className="hover:shadow-medium transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                        <p className="text-sm text-gray-600">{agent.role}</p>
                      </div>
                    </div>
                    <Badge variant={agent.status === 'idle' ? 'default' : agent.status === 'active' ? 'success' : 'warning'}>
                      {agent.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{agent.goal}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-medium">{agent.model}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Performance:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={agent.performanceScore} className="w-16" />
                        <span className="font-medium">{agent.performanceScore}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tasks Completed:</span>
                      <span className="font-medium">{agent.tasksCompleted}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {agent.tools.slice(0, 3).map((tool) => (
                        <Badge key={tool} variant="info" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                      {agent.tools.length > 3 && (
                        <Badge variant="default" className="text-xs">
                          +{agent.tools.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Task Form */}
            <Card>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-primary-600" />
                Create New Task
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Task Name"
                  value={newTask.name}
                  onChange={(value) => setNewTask(prev => ({ ...prev, name: value }))}
                />
                <Select
                  value={newTask.priority}
                  onChange={(value) => setNewTask(prev => ({ ...prev, priority: value as any }))}
                  options={[
                    { value: 'urgent', label: 'Urgent' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' }
                  ]}
                />
                <Textarea
                  placeholder="Task Description"
                  value={newTask.description}
                  onChange={(value) => setNewTask(prev => ({ ...prev, description: value }))}
                />
                <div className="space-y-2">
                  <Select
                    value={newTask.outputFormat}
                    onChange={(value) => setNewTask(prev => ({ ...prev, outputFormat: value as any }))}
                    options={[
                      { value: 'text', label: 'Text' },
                      { value: 'markdown', label: 'Markdown' },
                      { value: 'json', label: 'JSON' },
                      { value: 'csv', label: 'CSV' },
                      { value: 'pdf', label: 'PDF Report' }
                    ]}
                  />
                  <Select
                    value={newTask.assignedAgent}
                    onChange={(value) => setNewTask(prev => ({ ...prev, assignedAgent: value }))}
                    placeholder="Assign to Agent"
                    options={agents.map(agent => ({ value: agent.id, label: agent.name }))}
                  />
                </div>
                <Textarea
                  placeholder="Additional Context"
                  value={newTask.context}
                  onChange={(value) => setNewTask(prev => ({ ...prev, context: value }))}
                />
                <Textarea
                  placeholder="Expected Output"
                  value={newTask.expectedOutput}
                  onChange={(value) => setNewTask(prev => ({ ...prev, expectedOutput: value }))}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={addTask}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </Card>

            {/* Tasks List */}
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-medium transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{task.name}</h4>
                        <Badge variant={task.priority === 'urgent' ? 'danger' : task.priority === 'high' ? 'warning' : task.priority === 'medium' ? 'info' : 'default'}>
                          {task.priority}
                        </Badge>
                        <Badge variant="default">{task.outputFormat}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {task.assignedAgent && (
                          <span>Assigned to: {agents.find(a => a.id === task.assignedAgent)?.name}</span>
                        )}
                        <span>Progress: {task.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={[
                    { value: 'all', label: 'All Categories' },
                    { value: 'research', label: 'Research' },
                    { value: 'marketing', label: 'Marketing' },
                    { value: 'development', label: 'Development' },
                    { value: 'custom', label: 'Custom' }
                  ]}
                />
              </div>
            </Card>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-medium transition-shadow duration-200 relative">
                  {template.featured && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="warning">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{template.agentCount} agents</span>
                      <span>{template.taskCount} tasks</span>
                      <Badge variant="info">{template.category}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(template.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{template.rating}</span>
                      </div>
                      <Badge variant={template.complexity === 'beginner' ? 'success' : template.complexity === 'intermediate' ? 'warning' : 'danger'}>
                        {template.complexity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'execution' && (
          <div className="space-y-6">
            {/* Execution Controls */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Crew Execution Engine</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={simulateExecution}
                    disabled={isExecuting}
                    variant={isExecuting ? "secondary" : "success"}
                  >
                    {isExecuting ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Crew
                      </>
                    )}
                  </Button>
                  {isExecuting && (
                    <Button variant="danger" size="sm">
                      <Square className="w-4 h-4 mr-2" />
                      Stop
                    </Button>
                  )}
                </div>
              </div>
              
              {isExecuting && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">{Math.round(executionProgress)}%</span>
                  </div>
                  <Progress value={executionProgress} />
                </div>
            <div className="text-sm text-gray-500 hidden sm:block">
              Powered by Cerebras AI Models
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${isExecuting ? 'bg-success-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">
                {isExecuting ? 'Executing' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'agents', label: 'Agents', icon: Users, count: tabCounts.agents },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare, count: tabCounts.tasks },
              { id: 'templates', label: 'Templates', icon: FileText, count: tabCounts.templates },
              { id: 'execution', label: 'Execution', icon: Activity },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'files', label: 'Files', icon: FolderOpen, count: tabCounts.files }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <Badge variant="info">{tab.count}</Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
    