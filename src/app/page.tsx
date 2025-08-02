'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'running' | 'completed';
  tasks: number;
  cost: number;
  performance: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  priority: 'low' | 'medium' | 'high';
  agent: string;
  progress: number;
  outputFormat: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    agent: 'auto-assign',
    outputFormat: 'markdown'
  });

  useEffect(() => {
    setAgents([
      { id: '1', name: 'Research Agent', role: 'Senior Researcher', status: 'idle', tasks: 12, cost: 45.67, performance: 94 },
      { id: '2', name: 'Writer Agent', role: 'Content Creator', status: 'running', tasks: 8, cost: 32.45, performance: 87 },
      { id: '3', name: 'Data Scientist', role: 'Analytics Expert', status: 'idle', tasks: 15, cost: 67.89, performance: 91 },
      { id: '4', name: 'Marketing Expert', role: 'Strategy Specialist', status: 'completed', tasks: 6, cost: 23.12, performance: 96 }
    ]);
    setTasks([
      { id: '1', title: 'Market Research Analysis', description: 'Comprehensive market analysis for Q4', status: 'completed', priority: 'high', agent: 'Research Agent', progress: 100, outputFormat: 'PDF Report' },
      { id: '2', title: 'Content Writing', description: 'Blog post about AI trends', status: 'running', priority: 'medium', agent: 'Writer Agent', progress: 65, outputFormat: 'Markdown' },
      { id: '3', title: 'Data Processing', description: 'Clean and analyze customer data', status: 'pending', priority: 'high', agent: 'Data Scientist', progress: 0, outputFormat: 'CSV Export' },
      { id: '4', title: 'Campaign Strategy', description: 'Develop marketing campaign for new product', status: 'running', priority: 'low', agent: 'Marketing Expert', progress: 30, outputFormat: 'Presentation' }
    ]);
  }, []);

  const executeWorkflow = async () => {
    setIsExecuting(true);
    setLogs(['🚀 Initializing CrewAI workflow execution...']);
    
    const messages = [
      '⚙️ Loading agent configurations...',
      '🤖 Research Agent: Connecting to data sources...',
      '✍️ Writer Agent: Preparing content templates...',
      '📊 Data Scientist: Initializing analysis models...',
      '📈 Marketing Expert: Loading campaign frameworks...',
      '🔍 Research Agent: Gathering market intelligence...',
      '📝 Writer Agent: Generating content drafts...',
      '🧮 Data Scientist: Processing datasets...',
      '🎯 Marketing Expert: Optimizing targeting strategies...',
      '✅ All agents synchronized and ready',
      '🎉 Workflow execution completed successfully!'
    ];

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setLogs(prev => [...prev, messages[i]]);
    }
    
    setIsExecuting(false);
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'pending',
      priority: newTask.priority as 'low' | 'medium' | 'high',
      agent: newTask.agent === 'auto-assign' ? 'Auto-assign best agent' : newTask.agent,
      progress: 0,
      outputFormat: newTask.outputFormat
    };
    
    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '', priority: 'medium', agent: 'auto-assign', outputFormat: 'markdown' });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: activeTab === 'overview' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      color: activeTab === 'overview' ? 'white' : '#1e293b'
    },
    header: {
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.1)' : 'white',
      backdropFilter: activeTab === 'overview' ? 'blur(10px)' : 'none',
      borderBottom: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #e2e8f0',
      padding: '1rem 2rem'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: activeTab === 'overview' ? 'white' : '#1e293b',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    subtitle: {
      fontSize: '0.9rem',
      opacity: 0.8,
      marginTop: '0.25rem'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    statusBadge: {
      background: 'rgba(34, 197, 94, 0.2)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      color: '#22c55e',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    costDisplay: {
      textAlign: 'right' as const,
      fontSize: '0.875rem',
      opacity: 0.9
    },
    button: {
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    },
    buttonDisabled: {
      background: 'rgba(255, 255, 255, 0.2)',
      cursor: 'not-allowed'
    },
    nav: {
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.05)' : 'white',
      padding: '0 2rem',
      borderBottom: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
    },
    navContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      gap: '2rem'
    },
    navItem: {
      padding: '1rem 0',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      fontSize: '0.875rem',
      fontWeight: '500',
      opacity: 0.7,
      transition: 'all 0.2s'
    },
    navItemActive: {
      opacity: 1,
      borderBottomColor: '#3b82f6'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    card: {
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.1)' : 'white',
      backdropFilter: activeTab === 'overview' ? 'blur(10px)' : 'none',
      borderRadius: '12px',
      padding: '1.5rem',
      border: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #e2e8f0',
      boxShadow: activeTab === 'overview' ? '0 8px 32px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: activeTab === 'overview' ? 'white' : '#1e293b',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.9)' : '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      background: 'white',
      color: '#1f2937'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      background: 'white',
      color: '#1f2937',
      minHeight: '100px',
      resize: 'vertical' as const
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #d1d5db',
      fontSize: '0.875rem',
      background: 'white',
      color: '#1f2937'
    },
    addButton: {
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.15)' : 'white',
      backdropFilter: activeTab === 'overview' ? 'blur(10px)' : 'none',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center' as const,
      border: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #e2e8f0',
      boxShadow: activeTab === 'overview' ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: activeTab === 'overview' ? 'white' : '#1e293b',
      margin: '0.5rem 0'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.8)' : '#64748b',
      margin: 0
    },
    agentItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
      borderRadius: '8px',
      marginBottom: '0.75rem',
      border: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
    },
    agentInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    agentName: {
      fontWeight: '600',
      color: activeTab === 'overview' ? 'white' : '#1e293b',
      margin: 0,
      fontSize: '0.95rem'
    },
    agentStats: {
      fontSize: '0.75rem',
      color: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.7)' : '#64748b',
      margin: '0.25rem 0 0 0'
    },
    status: {
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    statusIdle: {
      background: 'rgba(156, 163, 175, 0.2)',
      color: activeTab === 'overview' ? '#d1d5db' : '#6b7280',
      border: '1px solid rgba(156, 163, 175, 0.3)'
    },
    statusRunning: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    statusCompleted: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    },
    logs: {
      background: 'rgba(0, 0, 0, 0.3)',
      color: '#10b981',
      padding: '1.5rem',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      height: '300px',
      overflowY: 'auto' as const,
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    taskItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.05)' : '#f8fafc',
      borderRadius: '8px',
      marginBottom: '0.75rem',
      border: activeTab === 'overview' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      background: activeTab === 'overview' ? 'rgba(255, 255, 255, 0.1)' : '#e5e7eb',
      borderRadius: '2px',
      marginTop: '0.5rem',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      borderRadius: '2px',
      transition: 'width 0.3s ease'
    },
    priorityHigh: {
      background: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    },
    priorityMedium: {
      background: 'rgba(245, 158, 11, 0.2)',
      color: '#f59e0b',
      border: '1px solid rgba(245, 158, 11, 0.3)'
    },
    priorityLow: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.3)'
    }
  };

  const renderOverview = () => (
    <>
      <div style={styles.statGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Active Agents</p>
          <p style={styles.statValue}>{agents.length}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Running Tasks</p>
          <p style={styles.statValue}>{tasks.filter(t => t.status === 'running').length}</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Success Rate</p>
          <p style={styles.statValue}>94%</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Cost</p>
          <p style={styles.statValue}>$127</p>
        </div>
      </div>

      {isExecuting && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🚀 Live Execution Stream</h3>
          <div style={styles.logs}>
            {logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>{log}</div>
            ))}
            {isExecuting && <span style={{ animation: 'blink 1s infinite' }}>▋</span>}
          </div>
        </div>
      )}

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🤖 Active Agents</h3>
          {agents.map(agent => (
            <div key={agent.id} style={styles.agentItem}>
              <div style={styles.agentInfo}>
                <p style={styles.agentName}>{agent.name}</p>
                <p style={styles.agentStats}>{agent.tasks} tasks • ${agent.cost}</p>
              </div>
              <span style={{
                ...styles.status,
                ...(agent.status === 'idle' ? styles.statusIdle :
                    agent.status === 'running' ? styles.statusRunning :
                    styles.statusCompleted)
              }}>
                {agent.status}
              </span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📋 Recent Tasks</h3>
          {tasks.map(task => (
            <div key={task.id} style={styles.taskItem}>
              <div style={styles.agentInfo}>
                <p style={styles.agentName}>{task.title}</p>
                <p style={styles.agentStats}>Assigned to {task.agent}</p>
              </div>
              <span style={{
                ...styles.status,
                ...(task.status === 'pending' ? styles.statusIdle :
                    task.status === 'running' ? styles.statusRunning :
                    styles.statusCompleted)
              }}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderTasks = () => (
    <>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📋 Add New Task</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Task Name</label>
            <input
              style={styles.input}
              placeholder="e.g., Market Research Analysis"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Priority Level</label>
            <select
              style={styles.select}
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Assigned Agent</label>
            <select
              style={styles.select}
              value={newTask.agent}
              onChange={(e) => setNewTask({...newTask, agent: e.target.value})}
            >
              <option value="auto-assign">🤖 Auto-assign best agent</option>
              {agents.map(agent => (
                <option key={agent.id} value={agent.name}>{agent.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Output Format</label>
            <select
              style={styles.select}
              value={newTask.outputFormat}
              onChange={(e) => setNewTask({...newTask, outputFormat: e.target.value})}
            >
              <option value="markdown">📝 Markdown Report</option>
              <option value="pdf">📄 PDF Document</option>
              <option value="csv">📊 CSV Export</option>
              <option value="presentation">📈 Presentation</option>
            </select>
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Task Description</label>
          <textarea
            style={styles.textarea}
            placeholder="Provide detailed instructions for what the agent should accomplish..."
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          />
        </div>
        <button style={styles.addButton} onClick={addTask}>
          ➕ Add Task
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>📋 Task Queue ({tasks.length})</h3>
        {tasks.map(task => (
          <div key={task.id} style={styles.taskItem}>
            <div style={styles.agentInfo}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <p style={styles.agentName}>{task.title}</p>
                <span style={{
                  ...styles.status,
                  ...(task.priority === 'high' ? styles.priorityHigh :
                      task.priority === 'medium' ? styles.priorityMedium :
                      styles.priorityLow)
                }}>
                  {task.priority}
                </span>
              </div>
              <p style={styles.agentStats}>Assigned to {task.agent}</p>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${task.progress}%`}}></div>
              </div>
            </div>
            <span style={{
              ...styles.status,
              ...(task.status === 'pending' ? styles.statusIdle :
                  task.status === 'running' ? styles.statusRunning :
                  styles.statusCompleted)
            }}>
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>
              ☁️ CrewAI Dashboard
            </h1>
            <p style={styles.subtitle}>Powered by Cerebras AI Models</p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.statusBadge}>
              ● System Ready
            </div>
            <div style={styles.costDisplay}>
              <div>Total Cost</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>$127.45</div>
            </div>
            <button
              onClick={executeWorkflow}
              disabled={isExecuting}
              style={{
                ...styles.button,
                ...(isExecuting ? styles.buttonDisabled : {})
              }}
            >
              {isExecuting ? '⚡ Executing...' : '🚀 Execute Workflow'}
            </button>
          </div>
        </div>
      </header>

      <nav style={styles.nav}>
        <div style={styles.navContent}>
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'agents', label: `Agents (${agents.length})` },
            { key: 'tasks', label: `Tasks (${tasks.length})` },
            { key: 'templates', label: 'Templates (4)' },
            { key: 'execute', label: 'Execute' },
            { key: 'analytics', label: 'Analytics' },
            { key: 'files', label: 'Files (4)' }
          ].map(tab => (
            <div
              key={tab.key}
              style={{
                ...styles.navItem,
                ...(activeTab === tab.key ? styles.navItemActive : {})
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </nav>

      <main style={styles.main}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'agents' && renderOverview()}
        {activeTab === 'templates' && renderTasks()}
        {activeTab === 'execute' && renderOverview()}
        {activeTab === 'analytics' && renderOverview()}
        {activeTab === 'files' && renderTasks()}
      </main>

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}