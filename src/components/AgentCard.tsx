'use client';

import { Brain, Clock, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Agent } from '@/types';
import { getStatusColor, formatCurrency } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.role}</p>
          </div>
        </div>
        <Badge variant={agent.status === 'running' ? 'success' : 'default'}>
          {agent.status}
        </Badge>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600 mb-1">Goal</p>
          <p className="text-sm font-medium">{agent.goal}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">Performance Score</p>
          <div className="flex items-center space-x-2">
            <Progress value={agent.performanceScore} className="flex-1" />
            <span className="text-sm font-medium">{agent.performanceScore}%</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-3 border-t">
          <div className="text-center">
            <p className="text-xs text-gray-500">Tasks</p>
            <p className="font-semibold">{agent.tasksCompleted}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Tokens</p>
            <p className="font-semibold">{agent.tokens.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Cost</p>
            <p className="font-semibold">{formatCurrency(agent.cost)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}