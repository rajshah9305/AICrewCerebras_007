import { NextResponse } from 'next/server';

const tasks = [
  {
    id: '1',
    title: 'Market Research Analysis',
    description: 'Comprehensive market analysis for Q4',
    status: 'completed',
    priority: 'high',
    agent: 'Research Agent',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Content Creation',
    description: 'Blog post about AI trends',
    status: 'running',
    priority: 'medium',
    agent: 'Writer Agent',
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTask = {
    id: Date.now().toString(),
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}