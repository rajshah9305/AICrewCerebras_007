# backend/app/main.py
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import asyncio
import json
import os
import uuid
from datetime import datetime
import aiofiles
from pathlib import Path

# Import your crew execution logic
from .crew_executor import CrewExecutor
from .models import AgentConfig, TaskConfig, ExecutionConfig, CrewTemplate

app = FastAPI(
    title="CrewAI Dashboard API",
    description="Backend API for CrewAI multi-agent workflows",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Ensure outputs directory exists
OUTPUT_DIR = Path("outputs")
OUTPUT_DIR.mkdir(exist_ok=True)

# In-memory storage (replace with database in production)
crew_templates = {}
execution_history = {}
active_executions = {}

# WebSocket connections for real-time updates
active_connections: List[WebSocket] = []

class CrewExecutionRequest(BaseModel):
    agents: List[AgentConfig]
    tasks: List[TaskConfig]
    config: ExecutionConfig
    topic: str

class WebSocketMessage(BaseModel):
    type: str
    data: Dict[str, Any]

@app.get("/")
async def root():
    return {"message": "CrewAI Dashboard API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming WebSocket messages if needed
    except WebSocketDisconnect:
        active_connections.remove(websocket)

async def broadcast_message(message: dict):
    """Broadcast message to all connected WebSocket clients"""
    if active_connections:
        for connection in active_connections[:]:  # Copy list to avoid modification during iteration
            try:
                await connection.send_text(json.dumps(message))
            except:
                # Remove dead connections
                if connection in active_connections:
                    active_connections.remove(connection)

@app.post("/api/v1/execute-crew")
async def execute_crew(request: CrewExecutionRequest):
    """Execute a crew with real-time streaming"""
    execution_id = str(uuid.uuid4())
    
    # Initialize execution tracking
    execution_info = {
        "id": execution_id,
        "status": "initializing",
        "started_at": datetime.now().isoformat(),
        "agents": [agent.dict() for agent in request.agents],
        "tasks": [task.dict() for task in request.tasks],
        "config": request.config.dict(),
        "topic": request.topic,
        "logs": [],
        "output": "",
        "files_generated": []
    }
    
    active_executions[execution_id] = execution_info
    
    try:
        # Initialize crew executor
        executor = CrewExecutor(
            agents=request.agents,
            tasks=request.tasks,
            config=request.config,
            execution_id=execution_id
        )
        
        # Start execution in background
        asyncio.create_task(run_crew_execution(executor, execution_id, request.topic))
        
        return {"execution_id": execution_id, "status": "started"}
        
    except Exception as e:
        execution_info["status"] = "failed"
        execution_info["error"] = str(e)
        await broadcast_message({
            "type": "execution_error",
            "execution_id": execution_id,
            "error": str(e)
        })
        raise HTTPException(status_code=500, detail=str(e))

async def run_crew_execution(executor: CrewExecutor, execution_id: str, topic: str):
    """Run crew execution with real-time updates"""
    try:
        execution_info = active_executions[execution_id]
        execution_info["status"] = "running"
        
        await broadcast_message({
            "type": "execution_started",
            "execution_id": execution_id,
            "topic": topic
        })
        
        # Execute crew with streaming
        async for update in executor.execute_with_streaming(topic):
            # Update execution info
            if update["type"] == "log":
                execution_info["logs"].append({
                    "timestamp": datetime.now().isoformat(),
                    "message": update["message"],
                    "level": update.get("level", "info")
                })
            elif update["type"] == "output":
                execution_info["output"] += update["content"]
            elif update["type"] == "file_generated":
                execution_info["files_generated"].append(update["file_info"])
            
            # Broadcast update to WebSocket clients
            await broadcast_message({
                "type": "execution_update",
                "execution_id": execution_id,
                "update": update
            })
        
        # Mark as completed
        execution_info["status"] = "completed"
        execution_info["completed_at"] = datetime.now().isoformat()
        
        await broadcast_message({
            "type": "execution_completed",
            "execution_id": execution_id,
            "files": execution_info["files_generated"]
        })
        
    except Exception as e:
        execution_info["status"] = "failed"
        execution_info["error"] = str(e)
        
        await broadcast_message({
            "type": "execution_error",
            "execution_id": execution_id,
            "error": str(e)
        })

@app.get("/api/v1/executions/{execution_id}")
async def get_execution_status(execution_id: str):
    """Get execution status and details"""
    if execution_id not in active_executions:
        raise HTTPException(status_code=404, detail="Execution not found")
    
    return active_executions[execution_id]

@app.get("/api/v1/executions")
async def list_executions():
    """List all executions"""
    return list(active_executions.values())

@app.post("/api/v1/templates")
async def save_template(template: CrewTemplate):
    """Save a crew template"""
    template_id = str(uuid.uuid4())
    template_data = template.dict()
    template_data["id"] = template_id
    template_data["created_at"] = datetime.now().isoformat()
    
    crew_templates[template_id] = template_data
    return {"template_id": template_id, "message": "Template saved successfully"}

@app.get("/api/v1/templates")
async def list_templates():
    """List all saved templates"""
    return list(crew_templates.values())

@app.get("/api/v1/templates/{template_id}")
async def get_template(template_id: str):
    """Get a specific template"""
    if template_id not in crew_templates:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return crew_templates[template_id]

@app.delete("/api/v1/templates/{template_id}")
async def delete_template(template_id: str):
    """Delete a template"""
    if template_id not in crew_templates:
        raise HTTPException(status_code=404, detail="Template not found")
    
    del crew_templates[template_id]
    return {"message": "Template deleted successfully"}

@app.get("/api/v1/files")
async def list_files():
    """List generated files"""
    files = []
    for file_path in OUTPUT_DIR.glob("*"):
        if file_path.is_file():
            stat = file_path.stat()
            files.append({
                "name": file_path.name,
                "size": f"{stat.st_size / 1024:.1f} KB",
                "created_at": datetime.fromtimestamp(stat.st_ctime).isoformat(),
                "modified_at": datetime.fromtimestamp(stat.st_mtime).isoformat()
            })
    
    return sorted(files, key=lambda x: x["modified_at"], reverse=True)

@app.get("/api/v1/files/{filename}")
async def download_file(filename: str):
    """Download a generated file"""
    file_path = OUTPUT_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(
        path=file_path,
        filename=filename,
        media_type='application/octet-stream'
    )

@app.delete("/api/v1/files/{filename}")
async def delete_file(filename: str):
    """Delete a generated file"""
    file_path = OUTPUT_DIR / filename
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path.unlink()
    return {"message": "File deleted successfully"}

@app.get("/api/v1/analytics")
async def get_analytics():
    """Get dashboard analytics"""
    completed_executions = [e for e in active_executions.values() if e["status"] == "completed"]
    failed_executions = [e for e in active_executions.values() if e["status"] == "failed"]
    
    total_executions = len(active_executions)
    success_rate = (len(completed_executions) / total_executions * 100) if total_executions > 0 else 0
    
    return {
        "total_executions": total_executions,
        "successful_executions": len(completed_executions),
        "failed_executions": len(failed_executions),
        "success_rate": round(success_rate, 1),
        "total_templates": len(crew_templates),
        "total_files": len(list(OUTPUT_DIR.glob("*"))),
        "recent_activity": list(active_executions.values())[-10:]  # Last 10 executions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)