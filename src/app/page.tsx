'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Bot = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
    <circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/>
    <line x1="8" y1="16" x2="8" y2="16"/>
    <line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);

const Monitor = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const BarChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
);

const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

export default function CrewCraftHub() {
  const [currentView, setCurrentView] = useState('dashboard');

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Bot },
    { id: "templates", label: "Templates", icon: Monitor },
    { id: "my-agents", label: "My Agents", icon: Users, badge: 0 },
    { id: "create", label: "Create Agent", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "settings", label: "API Settings", icon: Settings }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              <Bot style={{ width: '24px', height: '24px', color: 'white' }} />
              <div style={{ 
                position: 'absolute', 
                top: '-2px', 
                right: '-2px', 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#10b981', 
                borderRadius: '50%',
                border: '2px solid white'
              }}></div>
            </div>
            <div>
              <h1 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                margin: 0,
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CrewCraft
              </h1>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>AI Agent Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ display: 'flex', gap: '8px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isActive ? '#4f46e5' : 'transparent',
                    color: isActive ? 'white' : '#64748b',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <Icon style={{ width: '16px', height: '16px' }} />
                  {item.label}
                  {item.badge !== undefined && (
                    <span style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
                      color: isActive ? 'white' : '#64748b',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>
        {currentView === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Hero Section */}
            <div style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
              borderRadius: '24px',
              padding: '48px',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Badge style={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  marginBottom: '24px'
                }}>
                  🚀 CrewAI Platform v2.0 - Powered by Cerebras
                </Badge>
                
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  lineHeight: '1.1',
                  marginBottom: '16px'
                }}>
                  Build Powerful
                </h1>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  lineHeight: '1.1',
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, #fbbf24, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  AI Agent Teams
                </h1>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  lineHeight: '1.1',
                  marginBottom: '24px'
                }}>
                  in Minutes
                </h1>
                
                <p style={{
                  fontSize: '18px',
                  opacity: 0.9,
                  maxWidth: '600px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6'
                }}>
                  Create, coordinate, and deploy intelligent AI agent crews powered by Cerebras' ultra-fast inference. Build sophisticated multi-agent workflows with our intuitive platform.
                </p>
                
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <Button
                    onClick={() => setCurrentView('templates')}
                    style={{
                      backgroundColor: 'white',
                      color: '#4f46e5',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Monitor style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Explore Templates
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentView('create')}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    <Plus style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                    Create Crew
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {[
                { 
                  title: "Active Agents", 
                  value: "2", 
                  trend: "+12%", 
                  color: "#3b82f6",
                  bgColor: "#dbeafe",
                  icon: "🤖"
                },
                { 
                  title: "Templates Available", 
                  value: "6", 
                  trend: "+3 new", 
                  color: "#8b5cf6",
                  bgColor: "#e9d5ff",
                  icon: "📋"
                },
                { 
                  title: "Total Tasks", 
                  value: "1,247", 
                  trend: "+18%", 
                  color: "#10b981",
                  bgColor: "#d1fae5",
                  icon: "📊"
                },
                { 
                  title: "Success Rate", 
                  value: "94.2%", 
                  trend: "+2.1%", 
                  color: "#f59e0b",
                  bgColor: "#fef3c7",
                  icon: "🎯"
                }
              ].map((stat, index) => (
                <Card key={index} style={{
                  backgroundColor: stat.bgColor,
                  border: 'none',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '80px',
                    height: '80px',
                    backgroundColor: stat.color,
                    opacity: 0.1,
                    borderBottomLeftRadius: '24px'
                  }} />
                  
                  <CardHeader style={{ paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: stat.color,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}>
                        {stat.icon}
                      </div>
                      <Badge style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        border: '1px solid #bbf7d0'
                      }}>
                        {stat.trend}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div style={{ fontSize: '36px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: stat.color }}>
                      {stat.title}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Views */}
        {currentView !== 'dashboard' && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
              {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>
              This section is under development
            </p>
          </div>
        )}
      </main>
    </div>
  );
}