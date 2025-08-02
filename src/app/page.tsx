'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed';
  tasks: number;
  cost: number;
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'completed';
  agent: string;
}

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setAgents([
      { id: '1', name: 'Research Agent', status: 'idle', tasks: 12, cost: 45.67 },
      { id: '2', name: 'Writer Agent', status: 'idle', tasks: 8, cost: 32.45 }
    ]);
    setTasks([
      { id: '1', title: 'Market Research', status: 'completed', agent: 'Research Agent' },
      { id: '2', title: 'Content Writing', status: 'running', agent: 'Writer Agent' }
    ]);
  }, []);

  const executeWorkflow = async () => {
    setIsExecuting(true);
    setLogs(['Starting workflow execution...']);
    
    const messages = [
      'Initializing agents...',
      'Research Agent: Starting market analysis...',
      'Writer Agent: Preparing content structure...',
      'Research Agent: Data collection complete',
      'Writer Agent: Content generation in progress...',
      'Workflow execution completed successfully!'
    ];

    for (let i = 0; i < messages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLogs(prev => [...prev, messages[i]]);
    }
    
    setIsExecuting(false);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '1rem 2rem'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: 0
    },
    button: {
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    buttonDisabled: {
      backgroundColor: '#94a3b8',
      cursor: 'not-allowed'
    },
    main: {
      maxWidth: '1200px',
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
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '1rem'
    },
    statGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      textAlign: 'center' as const
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1e293b',
      margin: '0.5rem 0'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      margin: 0
    },
    agentItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.375rem',
      marginBottom: '0.5rem'
    },
    agentInfo: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    agentName: {
      fontWeight: '500',
      color: '#1e293b',
      margin: 0
    },
    agentStats: {
      fontSize: '0.75rem',
      color: '#64748b',
      margin: 0
    },
    status: {
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    statusIdle: {
      backgroundColor: '#f1f5f9',
      color: '#475569'
    },
    statusRunning: {
      backgroundColor: '#dbeafe',
      color: '#1d4ed8'
    },
    statusCompleted: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    logs: {
      backgroundColor: '#1e293b',
      color: '#10b981',
      padding: '1rem',
      borderRadius: '0.375rem',
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      height: '200px',
      overflowY: 'auto' as const
    },
    taskItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.375rem',
      marginBottom: '0.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>CrewAI Dashboard</h1>
          <button
            onClick={executeWorkflow}
            disabled={isExecuting}
            style={{
              ...styles.button,
              ...(isExecuting ? styles.buttonDisabled : {})
            }}
          >
            {isExecuting ? 'Executing...' : 'Execute Workflow'}
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.statGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Active Agents</p>
            <p style={styles.statValue}>{agents.length}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Tasks</p>
            <p style={styles.statValue}>{tasks.length}</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Success Rate</p>
            <p style={styles.statValue}>94%</p>
          </div>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Cost</p>
            <p style={styles.statValue}>$78</p>
          </div>
        </div>

        {isExecuting && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Live Execution</h3>
            <div style={styles.logs}>
              {logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
              {isExecuting && <span style={{ animation: 'blink 1s infinite' }}>▋</span>}
            </div>
          </div>
        )}

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Active Agents</h3>
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
            <h3 style={styles.cardTitle}>Recent Tasks</h3>
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