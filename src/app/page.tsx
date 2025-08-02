'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CrewAIDashboard() {
  const [activeTab, setActiveTab] = useState('Tasks');
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { name: 'Agents', count: 4 },
    { name: 'Tasks', count: 4 },
    { name: 'Templates', count: 4 },
    { name: 'Execute', count: null },
    { name: 'Analytics', count: null },
    { name: 'Files', count: 3 }
  ];

  const files = [
    { name: 'crew_results_b986bf25-ebeb-4b9c-90d1-40e57398e598_20250801_211949.md', size: '4.4 KB', date: '2024-08-01' },
    { name: 'market-analysis-report.pdf', size: '4.2 KB', date: '2024-08-01' },
    { name: 'competitor-research.xlsx', size: '2.8 KB', date: '2024-08-01' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #7c2d12 100%)', color: 'white', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              ☁️
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>CrewAI Dashboard</h1>
              <p style={{ fontSize: '0.875rem', opacity: 0.8, margin: 0 }}>Powered by Cerebras AI Models</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Badge style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              ● System Ready
            </Badge>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Total Cost</div>
              <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>$127.45</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ padding: '0 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                color: activeTab === tab.name ? '#60a5fa' : 'rgba(255,255,255,0.7)',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                borderBottom: activeTab === tab.name ? '2px solid #60a5fa' : '2px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {tab.name}
              {tab.count && (
                <span style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  padding: '0.125rem 0.375rem', 
                  borderRadius: '0.75rem', 
                  fontSize: '0.75rem' 
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Generated Files Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span>📁</span>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>Generated Files</h2>
              <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>Total size: 11.4 KB</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {files.map((file, index) => (
                <Card key={index} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <CardContent style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>
                        {file.name.endsWith('.md') ? '📄' : file.name.endsWith('.pdf') ? '📋' : '📊'}
                      </span>
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{file.name}</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{file.size} • {file.date}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => setShowModal(true)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: 'rgba(255,255,255,0.7)', 
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: '0.25rem'
                        }}
                      >
                        👁️
                      </button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'rgba(255,255,255,0.7)', 
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.25rem'
                      }}>
                        📥
                      </button>
                      <button style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'rgba(255,255,255,0.7)', 
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '0.25rem'
                      }}>
                        🗑️
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Run Crew Button */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}>
        <Button style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '2rem',
          fontSize: '1rem',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🚀 Run Crew
        </Button>
      </div>

      {/* File Preview Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '0.75rem',
            padding: '2rem',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>📄</span>
                <span style={{ fontWeight: '600' }}>crew_results_b986bf25-ebeb-4b9c-90d1-40e57398e598_20250801_211949.md</span>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5rem', 
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ 
              backgroundColor: '#f8fafc', 
              padding: '1.5rem', 
              borderRadius: '0.5rem', 
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              <div># crew_results_b986bf25-ebeb-4b9c-90d1-40e57398e598_20250801_211949.md</div>
              <br />
              <div>Generated content for crew_results_b986bf25-ebeb-4b9c-90d1-40e57398e598_20250801_211949.md</div>
              <br />
              <div>Created: 2025-08-01, 9:19:49 PM</div>
              <div>Size: 4.4 KB</div>
              <div>Type: report</div>
              <br />
              <div>This is a sample file content. In a real implementation, this would contain the actual file data.</div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📥 Download
              </Button>
              <Button 
                onClick={() => setShowModal(false)}
                style={{
                  backgroundColor: '#6b7280',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}