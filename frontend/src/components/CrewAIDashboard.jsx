import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, CheckSquare, Play, FileText, Plus, Download, Settings, ChevronDown, 
  User, Target, Briefcase, Upload, Save, FolderOpen, Trash2, Edit3, Copy,
  BarChart3, Clock, Zap, Brain, Network, Eye, Pause, RotateCcw, 
  MessageSquare, Star, Filter, Search, Calendar, TrendingUp, Activity,
  Database, Code, Globe, Shield, Cpu, Layers, Monitor
} from 'lucide-react';

const CrewAIDashboard = () => {
  const [activeTab, setActiveTab] = useState('agents');
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Research & Analysis Team",
      description: "Multi-agent research workflow with analyst, researcher, and writer",
      agents: 3,
      tasks: 5,
      category: "Research",
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "Content Creation Squad",
      description: "SEO-optimized content creation with strategist and editor",
      agents: 2,
      tasks: 4,
      category: "Marketing",
      rating: 4.6,
      featured: false
    },
    {
      id: 3,
      name: "Code Review Team",
      description: "Automated code review with security and performance analysis",
      agents: 3,
      tasks: 6,
      category: "Development",
      rating: 4.9,
      featured: true
    }
  ]);
  
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'crew-results-2024-01-15T10-30-00.txt',
      size: '2.0 KB',
      date: '2024-01-15 10:30:00',
      type: 'output',
      status: 'completed'
    },
    {
      id: 2,
      name: 'market-analysis-report.md',
      size: '4.0 KB',
      date: '2024-01-15 09:15:00',
      type: 'report',
      status: 'completed'
    }
  ]);

  const [agentForm, setAgentForm] = useState({
    role: '',
    goal: '',
    backstory: '',
    tools: [],
    maxIterations: 5,
    temperature: 0.7,
    model: 'llama-3.3-70b'
  });

  const [taskForm, setTaskForm] = useState({
    name: '',
    description: '',
    expectedOutput: '',
    assignedAgent: '',
    priority: 'medium',
    context: '',
    outputFormat: 'text'
  });

  const [executionConfig, setExecutionConfig] = useState({
    topic: '',
    model: 'llama-3.3-70b',
    process: 'sequential',
    maxIterations: 10,
    verbose: true,
    memory: true,
    collaboration: true
  });

  const [isExecuting, setIsExecuting] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [executionLogs, setExecutionLogs] = useState([]);
  const [executionStats, setExecutionStats] = useState({
    startTime: null,
    duration: 0,
    tokensUsed: 0,
    apiCalls: 0,
    status: 'idle'
  });

  const [analytics, setAnalytics] = useState({
    totalExecutions: 47,
    successRate: 94.2,
    avgDuration: '2m 34s',
    totalTokens: 847293,
    topPerformingAgent: 'Research Analyst',
    weeklyTrend: '+12.4%'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [wsConnection, setWsConnection] = useState(null);
  
  const outputRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setWsConnection(ws);
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      handleWebSocketMessage(message);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWsConnection(null);
    };
    
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (message) => {
    switch (message.type) {
      case 'execution_started':
        setIsExecuting(true);
        setExecutionOutput('');
        setExecutionLogs([]);
        break;
      case 'execution_update':
        if (message.update.type === 'log') {
          setExecutionLogs(prev => [...prev, message.update]);
        } else if (message.update.type === 'output') {
          setExecutionOutput(prev => prev + message.update.content);
        }
        break;
      case 'execution_completed':
        setIsExecuting(false);
        break;
      case 'execution_error':
        setIsExecuting(false);
        setExecutionLogs(prev => [...prev, {
          type: 'log',
          message: `Error: ${message.error}`,
          level: 'error'
        }]);
        break;
    }
  };

  // Auto-scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [executionOutput]);

  const addAgent = () => {
    if (agentForm.role && agentForm.goal && agentForm.backstory) {
      const newAgent = {
        id: Date.now(),
        ...agentForm,
        tools: agentForm.tools || []
      };
      setAgents([...agents, newAgent]);
      setAgentForm({
        role: '',
        goal: '',
        backstory: '',
        tools: [],
        maxIterations: 5,
        temperature: 0.7,
        model: 'llama-3.3-70b'
      });
    }
  };

  const addTask = () => {
    if (taskForm.name && taskForm.description && taskForm.expectedOutput) {
      const newTask = {
        id: Date.now(),
        ...taskForm
      };
      setTasks([...tasks, newTask]);
      setTaskForm({
        name: '',
        description: '',
        expectedOutput: '',
        assignedAgent: '',
        priority: 'medium',
        context: '',
        outputFormat: 'text'
      });
    }
  };

  const executeCrewAPI = async () => {
    if (agents.length === 0 || tasks.length === 0 || !executionConfig.topic) {
      alert('Please add at least one agent, one task, and specify a topic');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/execute-crew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agents: agents,
          tasks: tasks,
          config: executionConfig,
          topic: executionConfig.topic
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Execution started:', result);
    } catch (error) {
      console.error('Error executing crew:', error);
      alert('Error starting execution. Make sure the backend server is running.');
    }
  };

  const renderAgentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Agent
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={agentForm.role}
              onChange={(e) => setAgentForm({...agentForm, role: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Research Analyst"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <select
              value={agentForm.model}
              onChange={(e) => setAgentForm({...agentForm, model: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="llama-3.3-70b">Llama 3.3 70B</option>
              <option value="llama-3.1-8b">Llama 3.1 8B</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
            <input
              type="text"
              value={agentForm.goal}
              onChange={(e) => setAgentForm({...agentForm, goal: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What should this agent accomplish?"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Backstory</label>
            <textarea
              value={agentForm.backstory}
              onChange={(e) => setAgentForm({...agentForm, backstory: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Agent's background and expertise..."
            />
          </div>
        </div>
        <button
          onClick={addAgent}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Agent
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Configured Agents ({agents.length})
          </h3>
        </div>
        <div className="divide-y">
          {agents.map((agent) => (
            <div key={agent.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{agent.role}</h4>
                  <p className="text-sm text-gray-600 mt-1">{agent.goal}</p>
                  <p className="text-xs text-gray-500 mt-2">{agent.backstory}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {agent.model}
                    </span>
                    <span className="text-xs text-gray-500">
                      Max iterations: {agent.maxIterations}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setAgents(agents.filter(a => a.id !== agent.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {agents.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No agents configured yet. Add your first agent above.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderTasksTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Task
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <input
              type="text"
              value={taskForm.name}
              onChange={(e) => setTaskForm({...taskForm, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Market Research"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agent</label>
            <select
              value={taskForm.assignedAgent}
              onChange={(e) => setTaskForm({...taskForm, assignedAgent: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an agent...</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.role}>{agent.role}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={taskForm.description}
              onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Detailed task description..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
            <textarea
              value={taskForm.expectedOutput}
              onChange={(e) => setTaskForm({...taskForm, expectedOutput: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
              placeholder="What should the output look like?"
            />
          </div>
        </div>
        <button
          onClick={addTask}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <CheckSquare className="w-5 h-5 mr-2" />
            Configured Tasks ({tasks.length})
          </h3>
        </div>
        <div className="divide-y">
          {tasks.map((task) => (
            <div key={task.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <p className="text-xs text-gray-500 mt-2">Expected: {task.expectedOutput}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    {task.assignedAgent && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {task.assignedAgent}
                      </span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {task.priority}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No tasks configured yet. Add your first task above.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderExecuteTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Execution Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic/Objective</label>
            <input
              type="text"
              value={executionConfig.topic}
              onChange={(e) => setExecutionConfig({...executionConfig, topic: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What should the crew work on?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Process Type</label>
            <select
              value={executionConfig.process}
              onChange={(e) => setExecutionConfig({...executionConfig, process: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sequential">Sequential</option>
              <option value="hierarchical">Hierarchical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Iterations</label>
            <input
              type="number"
              value={executionConfig.maxIterations}
              onChange={(e) => setExecutionConfig({...executionConfig, maxIterations: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="50"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Ready: {agents.length} agents, {tasks.length} tasks
          </div>
          <button
            onClick={executeCrewAPI}
            disabled={isExecuting || agents.length === 0 || tasks.length === 0 || !executionConfig.topic}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {isExecuting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Executing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Execute Crew
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Execution Logs
            </h3>
          </div>
          <div className="p-4 h-64 overflow-y-auto custom-scrollbar">
            {executionLogs.map((log, index) => (
              <div key={index} className={`text-sm mb-2 ${
                log.level === 'error' ? 'text-red-600' : 
                log.level === 'success' ? 'text-green-600' : 
                'text-gray-700'
              }`}>
                {log.message}
              </div>
            ))}
            {executionLogs.length === 0 && (
              <div className="text-gray-500 text-sm">No logs yet. Start an execution to see real-time updates.</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Output
            </h3>
          </div>
          <div ref={outputRef} className="p-4 h-64 overflow-y-auto custom-scrollbar">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {executionOutput || 'No output yet. Results will appear here during execution.'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <FolderOpen className="w-5 h-5 mr-2" />
            Generated Files ({files.length})
          </h3>
        </div>
        <div className="divide-y">
          {files.map((file) => (
            <div key={file.id} className="p-6 flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{file.name}</h4>
                <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    file.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {file.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {files.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No files generated yet. Execute a crew to generate output files.
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">CrewAI Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                wsConnection ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  wsConnection ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                {wsConnection ? 'Connected' : 'Disconnected'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'agents', label: 'Agents', icon: Users },
              { id: 'tasks', label: 'Tasks', icon: CheckSquare },
              { id: 'execute', label: 'Execute', icon: Play },
              { id: 'files', label: 'Files', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'agents' && renderAgentsTab()}
        {activeTab === 'tasks' && renderTasksTab()}
        {activeTab === 'execute' && renderExecuteTab()}
        {activeTab === 'files' && renderFilesTab()}
      </main>
    </div>
  );
};

export default CrewAIDashboard;