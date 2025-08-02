'use client';

import { Clock, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Task } from '@/types';
import { getStatusColor, getPriorityColor, formatDuration } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  agentName?: string;
}

export function TaskCard({ task, agentName }: TaskCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        <div className="flex space-x-2">
          <Badge variant={task.priority === 'high' || task.priority === 'urgent' ? 'warning' : 'default'}>
            {task.priority}
          </Badge>
          <Badge variant={task.status === 'completed' ? 'success' : task.status === 'failed' ? 'danger' : 'default'}>
            {task.status}
          </Badge>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {agentName && (
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{agentName}</span>
            </div>
          )}
          {task.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(task.duration)}</span>
            </div>
          )}
        </div>
        <div className="text-xs">
          {task.completedAt ? 'Completed' : 'Created'}: {
            (task.completedAt || task.createdAt).toLocaleDateString()
          }
        </div>
      </div>

      {task.output && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-gray-500 mb-1">Output</p>
          <p className="text-sm bg-gray-50 p-2 rounded">{task.output}</p>
        </div>
      )}
    </Card>
  );
}