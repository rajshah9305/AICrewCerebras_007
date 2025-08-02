import { NextRequest, NextResponse } from 'next/server';

// Types
interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  outputFormat: 'text' | 'markdown' | 'json' | 'csv' | 'pdf';
  assignedAgent?: string;
  progress: number;
  context: string;
  expectedOutput: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage (replace with database in production)
let tasks: Task[] = [
  {
    id: '1',
    name: 'Q4 Market Analysis',
    description: 'Analyze Q4 market trends and competitor positioning for strategic planning',
    priority: 'urgent',
    outputFormat: 'pdf',
    assignedAgent: '1',
    progress: 75,
    context: 'Focus on SaaS market segment with emphasis on emerging technologies',
    expectedOutput: 'Comprehensive 20-page market analysis report with strategic recommendations',
    status: 'in_progress',
    startedAt: new Date('2024-01-10').toISOString(),
    createdAt: new Date('2024-01-08').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    name: 'Content Calendar Development',
    description: 'Create a comprehensive content calendar for Q1 marketing campaigns',
    priority: 'high',
    outputFormat: 'markdown',
    assignedAgent: '2',
    progress: 40,
    context: 'Include social media, blog posts, and email marketing content',
    expectedOutput: 'Detailed content calendar with publishing schedule and content themes',
    status: 'in_progress',
    startedAt: new Date('2024-01-12').toISOString(),
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '3',
    name: 'Customer Churn Prediction',
    description: 'Build ML model to predict customer churn and identify risk factors',
    priority: 'medium',
    outputFormat: 'json',
    assignedAgent: '3',
    progress: 20,
    context: 'Use historical customer data and behavioral patterns',
    expectedOutput: 'Trained ML model with performance metrics and feature importance analysis',
    status: 'in_progress',
    startedAt: new Date('2024-01-14').toISOString(),
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '4',
    name: 'Competitor Analysis Report',
    description: 'Comprehensive analysis of top 5 competitors in the SaaS space',
    priority: 'low',
    outputFormat: 'pdf',
    progress: 0,
    context: 'Focus on pricing strategies, feature comparison, and market positioning',
    expectedOutput: 'Executive summary with competitive landscape overview and recommendations',
    status: 'pending',
    createdAt: new Date('2024-01-13').toISOString(),
    updatedAt: new Date('2024-01-13').toISOString()
  }
];

// GET /api/tasks - List all tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const assignedAgent = searchParams.get('assignedAgent');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let filteredTasks = tasks;
    
    // Apply filters
    if (status) {
      filteredTasks = filteredTasks.filter(task => task.status === status);
    }
    
    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }
    
    if (assignedAgent) {
      filteredTasks = filteredTasks.filter(task => task.assignedAgent === assignedAgent);
    }
    
    // Sort by priority and creation date
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    filteredTasks.sort((a, b) => {
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);
    
    // Calculate statistics
    const stats = {
      total: filteredTasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      failed: tasks.filter(t => t.status === 'failed').length,
      avgProgress: tasks.length > 0 ? Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length) : 0
    };
    
    return NextResponse.json({
      success: true,
      data: {
        tasks: paginatedTasks,
        pagination: {
          page,
          limit,
          total: filteredTasks.length,
          pages: Math.ceil(filteredTasks.length / limit),
          hasNext: endIndex < filteredTasks.length,
          hasPrev: page > 1
        },
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate priority
    const validPriorities = ['urgent', 'high', 'medium', 'low'];
    if (body.priority && !validPriorities.includes(body.priority)) {
      return NextResponse.json(
        { success: false, error: 'Invalid priority level' },
        { status: 400 }
      );
    }
    
    // Validate output format
    const validFormats = ['text', 'markdown', 'json', 'csv', 'pdf'];
    if (body.outputFormat && !validFormats.includes(body.outputFormat)) {
      return NextResponse.json(
        { success: false, error: 'Invalid output format' },
        { status: 400 }
      );
    }
    
    // Create new task
    const newTask: Task = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      priority: body.priority || 'medium',
      outputFormat: body.outputFormat || 'text',
      assignedAgent: body.assignedAgent,
      progress: 0,
      context: body.context || '',
      expectedOutput: body.expectedOutput || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to storage
    tasks.push(newTask);
    
    return NextResponse.json({
      success: true,
      data: { task: newTask },
      message: 'Task created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks - Update tasks
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { updates } = body;
    
    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { success: false, error: 'Updates must be an array' },
        { status: 400 }
      );
    }
    
    const updatedTasks = [];
    
    for (const update of updates) {
      const taskIndex = tasks.findIndex(t => t.id === update.id);
      if (taskIndex !== -1) {
        // Handle status changes
        const currentTask = tasks[taskIndex];
        const updatedTask = { ...currentTask, ...update, updatedAt: new Date().toISOString() };
        
        // Set timestamps based on status changes
        if (update.status === 'in_progress' && currentTask.status === 'pending') {
          updatedTask.startedAt = new Date().toISOString();
        } else if (update.status === 'completed' && currentTask.status !== 'completed') {
          updatedTask.completedAt = new Date().toISOString();
          updatedTask.progress = 100;
        }
        
        tasks[taskIndex] = updatedTask;
        updatedTasks.push(updatedTask);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: { tasks: updatedTasks },
      message: `Updated ${updatedTasks.length} tasks`
    });
    
  } catch (error) {
    console.error('Error updating tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update tasks' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks - Delete tasks
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get('ids')?.split(',') || [];
    
    if (ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No task IDs provided' },
        { status: 400 }
      );
    }
    
    const initialCount = tasks.length;
    tasks = tasks.filter(task => !ids.includes(task.id));
    const deletedCount = initialCount - tasks.length;
    
    return NextResponse.json({
      success: true,
      data: { deletedCount },
      message: `Deleted ${deletedCount} tasks`
    });
    
  } catch (error) {
    console.error('Error deleting tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete tasks' },
      { status: 500 }
    );
  }
}