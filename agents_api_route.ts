import { NextRequest, NextResponse } from 'next/server';

// Types
interface Agent {
  id: string;
  name: string;
  role: string;
  goal: string;
  backstory: string;
  model: string;
  temperature: number;
  maxIterations: number;
  tools: string[];
  status: 'idle' | 'active' | 'busy';
  performanceScore: number;
  tasksCompleted: number;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage (replace with database in production)
let agents: Agent[] = [
  {
    id: '1',
    name: 'Market Researcher',
    role: 'Senior Market Research Analyst',
    goal: 'Conduct comprehensive market analysis and identify growth opportunities',
    backstory: 'Expert in market research with 10+ years of experience in analyzing industry trends and consumer behavior.',
    model: 'Claude-3.5-Sonnet',
    temperature: 0.7,
    maxIterations: 3,
    tools: ['web_search', 'data_analysis', 'report_generator'],
    status: 'idle',
    performanceScore: 94,
    tasksCompleted: 127,
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    name: 'Content Strategist',
    role: 'Digital Content Strategy Expert',
    goal: 'Create compelling content strategies that drive engagement and conversions',
    backstory: 'Award-winning content strategist with expertise in multi-channel marketing campaigns.',
    model: 'GPT-4-Turbo',
    temperature: 0.8,
    maxIterations: 2,
    tools: ['content_generator', 'seo_optimizer', 'social_media'],
    status: 'active',
    performanceScore: 89,
    tasksCompleted: 98,
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '3',
    name: 'Data Scientist',
    role: 'Senior Data Science Specialist',
    goal: 'Extract actionable insights from complex datasets and build predictive models',
    backstory: 'PhD in Data Science with specialization in machine learning and statistical analysis.',
    model: 'Llama-3.1-70B',
    temperature: 0.5,
    maxIterations: 4,
    tools: ['python_interpreter', 'data_visualization', 'ml_models'],
    status: 'busy',
    performanceScore: 97,
    tasksCompleted: 156,
    createdAt: new Date('2024-01-03').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  }
];

// GET /api/agents - List all agents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const model = searchParams.get('model');
    
    let filteredAgents = agents;
    
    // Filter by status if provided
    if (status) {
      filteredAgents = filteredAgents.filter(agent => agent.status === status);
    }
    
    // Filter by model if provided
    if (model) {
      filteredAgents = filteredAgents.filter(agent => agent.model === model);
    }
    
    return NextResponse.json({
      success: true,
      data: {
        agents: filteredAgents,
        total: filteredAgents.length,
        activeCount: agents.filter(a => a.status === 'active').length,
        busyCount: agents.filter(a => a.status === 'busy').length,
        idleCount: agents.filter(a => a.status === 'idle').length
      }
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// POST /api/agents - Create new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'role', 'goal', 'backstory'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create new agent
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: body.name,
      role: body.role,
      goal: body.goal,
      backstory: body.backstory,
      model: body.model || 'Claude-3.5-Sonnet',
      temperature: body.temperature || 0.7,
      maxIterations: body.maxIterations || 3,
      tools: body.tools || [],
      status: 'idle',
      performanceScore: 0,
      tasksCompleted: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to storage (in production, save to database)
    agents.push(newAgent);
    
    return NextResponse.json({
      success: true,
      data: { agent: newAgent },
      message: 'Agent created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}

// PUT /api/agents - Update agent (bulk update)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { updates } = body; // Array of { id, ...updates }
    
    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { success: false, error: 'Updates must be an array' },
        { status: 400 }
      );
    }
    
    const updatedAgents = [];
    
    for (const update of updates) {
      const agentIndex = agents.findIndex(a => a.id === update.id);
      if (agentIndex !== -1) {
        agents[agentIndex] = {
          ...agents[agentIndex],
          ...update,
          updatedAt: new Date().toISOString()
        };
        updatedAgents.push(agents[agentIndex]);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: { agents: updatedAgents },
      message: `Updated ${updatedAgents.length} agents`
    });
    
  } catch (error) {
    console.error('Error updating agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update agents' },
      { status: 500 }
    );
  }
}

// DELETE /api/agents - Delete agents
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',') || [];
    
    if (ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No agent IDs provided' },
        { status: 400 }
      );
    }
    
    const initialCount = agents.length;
    agents = agents.filter(agent => !ids.includes(agent.id));
    const deletedCount = initialCount - agents.length;
    
    return NextResponse.json({
      success: true,
      data: { deletedCount },
      message: `Deleted ${deletedCount} agents`
    });
    
  } catch (error) {
    console.error('Error deleting agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete agents' },
      { status: 500 }
    );
  }
}