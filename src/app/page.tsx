'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed';
  tasks: number;
  cost: number;
  performance: number;
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed';
  priority: 'low' | 'medium' | 'high';
  agent: string;
  progress: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [systemStatus, setSystemStatus] = useState('ready');

  useEffect(() => {
    setAgents([
      { id: '1', name: 'Research Analyst', status: 'idle', tasks: 12, cost: 45.67, performance: 94 },
      { id: '2', name: 'Content Writer', status: 'running', tasks: 8, cost: 32.45, performance: 87 },
      { id: '3', name: 'Data Scientist', status: 'idle', tasks: 15, cost: 67.89, performance: 91 },
      { id: '4', name: 'Marketing Expert', status: 'completed', tasks: 6, cost: 23.12, performance: 96 }
    ]);
    setTasks([
      { id: '1', title: 'Market Research Analysis', status: 'completed', priority: 'high', agent: 'Research Analyst', progress: 100 },
      { id: '2', title: 'Content Creation', status: 'running', priority: 'medium', agent: 'Content Writer', progress: 65 },
      { id: '3', title: 'Data Processing', status: 'pending', priority: 'high', agent: 'Data Scientist', progress: 0 },
      { id: '4', title: 'Campaign Strategy', status: 'running', priority: 'low', agent: 'Marketing Expert', progress: 30 }
    ]);
  }, []);

  const executeWorkflow = async () => {
    setIsExecuting(true);
    setLogs(['🚀 Initializing CrewAI workflow execution...']);
    
    const messages = [
      '⚙️ Loading agent configurations...',
      '🤖 Research Analyst: Connecting to data sources...',
      '✍️ Content Writer: Preparing content templates...',
      '📊 Data Scientist: Initializing analysis models...',
      '📈 Marketing Expert: Loading campaign frameworks...',
      '🔍 Research Analyst: Gathering market intelligence...',
      '📝 Content Writer: Generating content drafts...',
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif',
      color: 'white'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
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
      color: 'white',
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
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '0 2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
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
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '1rem',
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
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center' as const,
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    statValue: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: 'white',
      margin: '0.5rem 0'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: 'rgba(255, 255, 255, 0.8)',
      margin: 0
    },
    agentItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      marginBottom: '0.75rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    agentInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    agentName: {
      fontWeight: '600',
      color: 'white',
      margin: 0,
      fontSize: '0.95rem'
    },
    agentStats: {
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.7)',
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
      color: '#d1d5db',
      border: '1px solid rgba(156, 163, 175, 0.3)'
    },
    statusRunning: {
      background: 'rgba(59, 130, 246, 0.2)',
      color: '#60a5fa',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    statusCompleted: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#4ade80',
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
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      marginBottom: '0.75rem',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      background: 'rgba(255, 255, 255, 0.1)',
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
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    },
    priorityMedium: {
      background: 'rgba(245, 158, 11, 0.2)',
      color: '#fbbf24',
      border: '1px solid rgba(245, 158, 11, 0.3)'
    },
    priorityLow: {
      background: 'rgba(34, 197, 94, 0.2)',
      color: '#4ade80',
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
          <p style={styles.statValue}>94.2%</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Cost</p>
          <p style={styles.statValue}>$127.45</p>
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
                <p style={styles.agentStats}>{agent.tasks} tasks • ${agent.cost} • {agent.performance}% performance</p>
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
          <h3 style={styles.cardTitle}>📋 Task Queue</h3>
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
          {['overview', 'agents', 'tasks', 'templates', 'execute', 'analytics', 'files'].map(tab => (
            <div
              key={tab}
              style={{
                ...styles.navItem,
                ...(activeTab === tab ? styles.navItemActive : {})
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} {tab !== 'overview' && agents.length > 0 && `(${tab === 'agents' ? agents.length : tasks.length})`}
            </div>
          ))}
        </div>
      </nav>

      <main style={styles.main}>
        {renderOverview()}
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