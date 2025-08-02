export interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  tasksCompleted: number;
  performanceScore: number;
  lastActive: Date;
  model: string;
  cost: number;
  tokens: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedAgent: string;
  createdAt: Date;
  completedAt?: Date;
  duration?: number;
  output?: string;
  cost?: number;
  tokens?: number;
}

export interface ExecutionLog {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  agent?: string;
  tokens?: number;
  cost?: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  downloads: number;
  agents: Omit<Agent, 'id' | 'status' | 'tasksCompleted' | 'performanceScore' | 'lastActive' | 'cost' | 'tokens'>[];
  tasks: Omit<Task, 'id' | 'status' | 'assignedAgent' | 'createdAt' | 'completedAt' | 'duration' | 'output' | 'cost' | 'tokens'>[];
  createdAt: Date;
  author: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  lastModified: Date;
  path: string;
  content?: string;
}

export interface AnalyticsData {
  totalExecutions: number;
  successRate: number;
  avgDuration: string;
  totalCost: string;
  tokenUsage: {
    model: string;
    tokens: number;
    percentage: number;
  }[];
  weeklyTrends: {
    date: string;
    executions: number;
    cost: number;
  }[];
}