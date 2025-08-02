import { NextResponse } from 'next/server';

const agents = [
  {
    id: '1',
    name: 'Research Agent',
    role: 'Senior Researcher',
    status: 'idle',
    tasks: 12,
    cost: 45.67,
    performance: 94
  },
  {
    id: '2',
    name: 'Writer Agent',
    role: 'Content Creator',
    status: 'running',
    tasks: 8,
    cost: 32.45,
    performance: 87
  }
];

export async function GET() {
  return NextResponse.json(agents);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newAgent = {
    id: Date.now().toString(),
    ...body,
    status: 'idle',
    tasks: 0,
    cost: 0,
    performance: 0
  };
  agents.push(newAgent);
  return NextResponse.json(newAgent, { status: 201 });
}