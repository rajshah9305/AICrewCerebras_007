'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Play, Square } from 'lucide-react';

interface ExecutionStreamProps {
  onExecute?: () => void;
}

export function ExecutionStream({ onExecute }: ExecutionStreamProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [output, setOutput] = useState('');

  const startExecution = async () => {
    setIsExecuting(true);
    setOutput('');
    
    try {
      const response = await fetch('/api/execution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workflow: 'default' })
      });

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              setOutput(prev => prev + data.message + '\n');
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (error) {
      setOutput(prev => prev + 'Error: ' + (error as Error).message + '\n');
    } finally {
      setIsExecuting(false);
    }

    onExecute?.();
  };

  const stopExecution = () => {
    setIsExecuting(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Execution Stream</h3>
        <div className="flex space-x-2">
          <Button 
            onClick={startExecution} 
            disabled={isExecuting}
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            {isExecuting ? 'Executing...' : 'Execute'}
          </Button>
          {isExecuting && (
            <Button 
              onClick={stopExecution} 
              variant="danger"
              size="sm"
            >
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          )}
        </div>
      </div>

      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
        <pre className="whitespace-pre-wrap">
          {output || 'Ready to execute workflow...\nClick "Execute" to start.'}
        </pre>
        {isExecuting && (
          <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></div>
        )}
      </div>
    </Card>
  );
}