# backend/app/models.py
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class AgentConfig(BaseModel):
    role: str = Field(..., description="The role of the agent")
    goal: str = Field(..., description="The goal of the agent")
    backstory: str = Field(..., description="The backstory of the agent")
    tools: Optional[List[str]] = Field(default=[], description="List of tool names")
    max_iterations: Optional[int] = Field(default=5, description="Maximum iterations")
    temperature: Optional[float] = Field(default=0.7, description="LLM temperature")
    model: Optional[str] = Field(default="llama-3.3-70b", description="LLM model to use")

class TaskConfig(BaseModel):
    name: str = Field(..., description="Name of the task")
    description: str = Field(..., description="Detailed description of the task")
    expected_output: str = Field(..., description="Expected output format and content")
    assigned_agent: Optional[str] = Field(default="", description="Role of assigned agent")
    priority: Optional[str] = Field(default="medium", description="Task priority")
    context: Optional[str] = Field(default="", description="Additional context")
    output_format: Optional[str] = Field(default="text", description="Output format")

class ExecutionConfig(BaseModel):
    topic: str = Field(..., description="Main topic or objective")
    model: Optional[str] = Field(default="llama-3.3-70b", description="Default model")
    process: Optional[str] = Field(default="sequential", description="Execution process type")
    max_iterations: Optional[int] = Field(default=10, description="Maximum iterations")
    verbose: Optional[bool] = Field(default=True, description="Verbose output")
    memory: Optional[bool] = Field(default=True, description="Enable memory")
    collaboration: Optional[bool] = Field(default=True, description="Enable collaboration")

class CrewTemplate(BaseModel):
    name: str = Field(..., description="Template name")
    description: str = Field(..., description="Template description")
    category: str = Field(..., description="Template category")
    agents: List[AgentConfig] = Field(..., description="List of agents")
    tasks: List[TaskConfig] = Field(..., description="List of tasks")
    config: ExecutionConfig = Field(..., description="Execution configuration")
    featured: Optional[bool] = Field(default=False, description="Featured template")
    rating: Optional[float] = Field(default=0.0, description="Template rating")

class ExecutionRequest(BaseModel):
    agents: List[AgentConfig]
    tasks: List[TaskConfig]
    config: ExecutionConfig

class ExecutionStatus(BaseModel):
    id: str
    status: str  # initializing, running, completed, failed
    started_at: datetime
    completed_at: Optional[datetime] = None
    progress: Optional[int] = Field(default=0, description="Progress percentage")
    current_step: Optional[str] = Field(default="", description="Current execution step")
    logs: List[Dict[str, Any]] = Field(default=[], description="Execution logs")
    output: Optional[str] = Field(default="", description="Current output")
    error: Optional[str] = Field(default=None, description="Error message if failed")
    files_generated: List[Dict[str, Any]] = Field(default=[], description="Generated files")

class FileInfo(BaseModel):
    name: str
    size: str
    created_at: datetime
    modified_at: Optional[datetime] = None
    type: str  # output, report, log, etc.
    status: str  # completed, processing, error

class AnalyticsData(BaseModel):
    total_executions: int
    successful_executions: int
    failed_executions: int
    success_rate: float
    total_templates: int
    total_files: int
    average_duration: Optional[float] = None
    popular_templates: List[str] = Field(default=[])
    recent_activity: List[Dict[str, Any]] = Field(default=[])

class WebSocketMessage(BaseModel):
    type: str  # execution_started, execution_update, execution_completed, execution_error
    execution_id: Optional[str] = None
    data: Dict[str, Any] = Field(default={})
    timestamp: datetime = Field(default_factory=datetime.now)