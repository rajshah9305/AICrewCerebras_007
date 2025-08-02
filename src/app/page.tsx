'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

// SVG Icons
const Bot = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);
const Home = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
const Settings = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const Menu = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);
const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const Server = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);
const Key = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);
const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default function CrewCraftHub() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [previousView, setPreviousView] = useState<string | null>(null);
  const [userAgents, setUserAgents] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [apiSettings, setApiSettings] = useState({
    cerebrasApiKey: '',
    isValidated: false,
    selectedModel: 'qwen-3-235b-a22b-instruct-2507'
  });

  const navigateTo = useCallback((view: string) => {
    setPreviousView(currentView);
    setCurrentView(view);
  }, [currentView]);

  const goBack = useCallback(() => {
    if (previousView) {
      setCurrentView(previousView);
      setPreviousView(null);
    } else {
      setCurrentView('dashboard');
    }
  }, [previousView]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "templates", label: "Templates", icon: Bot },
    { id: "my-agents", label: "My Agents", icon: Users, badge: userAgents.length },
    { id: "create", label: "Create Agent", icon: Plus },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "API Settings", icon: Settings }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'white', 
        borderBottom: '2px solid #f1f5f9', 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ 
                  width: '2.5rem', 
                  height: '2.5rem', 
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)', 
                  borderRadius: '0.75rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                }}>
                  <Bot style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                </div>
                <div style={{ 
                  position: 'absolute', 
                  top: '-0.25rem', 
                  right: '-0.25rem', 
                  width: '0.75rem', 
                  height: '0.75rem', 
                  backgroundColor: '#22c55e', 
                  borderRadius: '50%', 
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 0 0 2px white'
                }}></div>
              </div>
              <div>
                <h1 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed, #db2777)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  CrewCraft
                </h1>
                <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>AI Agent Platform</p>
              </div>
            </div>

            {/* Back Button */}
            {previousView && (
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                style={{ display: 'none' }}
              >
                <ArrowLeft style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                Back
              </Button>
            )}

            {/* Desktop Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    style={{
                      gap: '0.5rem',
                      backgroundColor: isActive ? '#3b82f6' : 'transparent',
                      color: isActive ? 'white' : '#6b7280'
                    }}
                    onClick={() => navigateTo(item.id)}
                  >
                    <Icon style={{ width: '1rem', height: '1rem' }} />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" style={{ marginLeft: '0.25rem' }}>
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X style={{ width: '1.25rem', height: '1.25rem' }} /> : <Menu style={{ width: '1.25rem', height: '1.25rem' }} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div style={{ borderTop: '1px solid #f1f5f9', padding: '1rem 0', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  
                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? "default" : "ghost"}
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        gap: '0.75rem',
                        backgroundColor: isActive ? '#3b82f6' : 'transparent',
                        color: isActive ? 'white' : '#6b7280'
                      }}
                      onClick={() => {
                        navigateTo(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon style={{ width: '1rem', height: '1rem' }} />
                      {item.label}
                      {item.badge && (
                        <Badge variant="secondary" style={{ marginLeft: 'auto' }}>
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Dashboard Content */}
        {currentView === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Hero Section */}
            <div style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              borderRadius: '1.5rem', 
              background: 'linear-gradient(135deg, #2563eb, #7c3aed, #db2777)', 
              color: 'white', 
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)' 
            }}>
              <div style={{ position: 'relative', padding: '3rem 2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
                  <div style={{ maxWidth: '36rem' }}>
                    <Badge style={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)', 
                      color: 'white', 
                      border: '1px solid rgba(255,255,255,0.3)',
                      marginBottom: '1.5rem'
                    }}>
                      🚀 CrewAI Platform v2.0 - Powered by Cerebras
                    </Badge>
                    <h1 style={{ 
                      fontSize: '3rem', 
                      fontWeight: 'bold', 
                      lineHeight: '1.25', 
                      marginBottom: '1.5rem' 
                    }}>
                      Build Powerful
                      <span style={{ 
                        display: 'block', 
                        background: 'linear-gradient(135deg, #fde047, #f9a8d4)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                      }}>
                        AI Agent Teams
                      </span>
                      in Minutes
                    </h1>
                    <p style={{ 
                      fontSize: '1.125rem', 
                      color: 'rgba(255,255,255,0.9)', 
                      lineHeight: '1.625', 
                      marginBottom: '2rem' 
                    }}>
                      Create, coordinate, and deploy intelligent AI agent crews powered by Cerebras' ultra-fast inference. 
                      Build sophisticated multi-agent workflows with our intuitive platform.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                      <Button
                        size="lg"
                        onClick={() => navigateTo("templates")}
                        style={{
                          backgroundColor: 'white',
                          color: '#2563eb',
                          boxShadow: '0 20px 25px rgba(0,0,0,0.1)',
                          transform: 'scale(1)',
                          transition: 'transform 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Bot style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                        Explore Templates
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigateTo("create")}
                        style={{
                          border: '1px solid rgba(255,255,255,0.3)',
                          color: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        <Plus style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                        Create Crew
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {[
                { title: "Active Agents", value: "2", icon: Bot, bgColor: '#eff6ff', textColor: '#1d4ed8', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', trend: "+12%" },
                { title: "Templates Available", value: "6", icon: Zap, bgColor: '#faf5ff', textColor: '#7c3aed', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)', trend: "+3 new" },
                { title: "Total Tasks", value: "1,247", icon: TrendingUp, bgColor: '#f0fdf4', textColor: '#15803d', gradient: 'linear-gradient(135deg, #22c55e, #10b981)', trend: "+18%" },
                { title: "Success Rate", value: "94.2%", icon: Target, bgColor: '#fff7ed', textColor: '#c2410c', gradient: 'linear-gradient(135deg, #f97316, #ef4444)', trend: "+2.1%" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    backgroundColor: stat.bgColor, 
                    border: 'none', 
                    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                    transform: 'scale(1)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      width: '5rem', 
                      height: '5rem', 
                      background: stat.gradient, 
                      opacity: 0.2, 
                      borderBottomLeftRadius: '1.5rem' 
                    }} />
                    <CardHeader style={{ paddingBottom: '0.75rem', position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ 
                          padding: '0.75rem', 
                          borderRadius: '0.75rem', 
                          background: stat.gradient, 
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                        }}>
                          <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                        </div>
                        <Badge variant="secondary" style={{ 
                          fontSize: '0.75rem', 
                          backgroundColor: '#dcfce7', 
                          color: '#166534', 
                          border: '1px solid #bbf7d0' 
                        }}>
                          {stat.trend}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent style={{ position: 'relative' }}>
                      <div>
                        <h3 style={{ 
                          fontSize: '3rem', 
                          fontWeight: 'bold', 
                          color: stat.textColor, 
                          margin: '0 0 0.25rem 0' 
                        }}>{stat.value}</h3>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '500', 
                          color: stat.textColor, 
                          margin: 0 
                        }}>{stat.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* API Status & Quick Actions */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
              gap: '1.5rem' 
            }}>
              <Card style={{ backgroundColor: 'white', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <CardHeader>
                  <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1f2937' }}>
                    <Server style={{ width: '1.25rem', height: '1.25rem', color: '#3b82f6' }} />
                    Cerebras AI Status
                  </CardTitle>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ 
                        width: '0.75rem', 
                        height: '0.75rem', 
                        borderRadius: '50%', 
                        backgroundColor: apiSettings.isValidated ? '#22c55e' : '#ef4444',
                        animation: apiSettings.isValidated ? 'pulse 2s infinite' : 'none',
                        boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.2)'
                      }} />
                      <span style={{ color: '#374151', fontWeight: '500' }}>
                        {apiSettings.isValidated ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    {apiSettings.isValidated && (
                      <Badge style={{ 
                        backgroundColor: '#dbeafe', 
                        color: '#1d4ed8', 
                        border: '1px solid #bfdbfe' 
                      }}>
                        Qwen 3-235B
                      </Badge>
                    )}
                  </div>
                  {!apiSettings.isValidated && (
                    <Button 
                      variant="outline" 
                      onClick={() => navigateTo('settings')}
                      style={{
                        border: '1px solid #bfdbfe',
                        color: '#2563eb'
                      }}
                    >
                      <Key style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                      Configure API
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'white', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <CardHeader>
                  <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1f2937' }}>
                    <Sparkles style={{ width: '1.25rem', height: '1.25rem', color: '#8b5cf6' }} />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Button 
                    onClick={() => navigateTo("templates")} 
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    <Bot style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    Browse Agent Templates
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigateTo("create")} 
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      border: '1px solid #e5e7eb',
                      color: '#374151'
                    }}
                  >
                    <Plus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    Create Custom Crew
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigateTo("analytics")} 
                    style={{
                      width: '100%',
                      justifyContent: 'flex-start',
                      border: '1px solid #e5e7eb',
                      color: '#374151'
                    }}
                  >
                    <BarChart3 style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Other views */}
        {currentView !== 'dashboard' && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')} View
            </h2>
            <p style={{ color: '#6b7280' }}>
              {currentView === 'templates' && 'Agent templates will be displayed here'}
              {currentView === 'my-agents' && 'Your created agents will be displayed here'}
              {currentView === 'create' && 'Agent creation form will be displayed here'}
              {currentView === 'analytics' && 'Analytics dashboard will be displayed here'}
              {currentView === 'settings' && 'API settings will be displayed here'}
            </p>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}