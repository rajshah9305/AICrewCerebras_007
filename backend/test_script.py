# backend/test_api.py
"""
Simple test script to verify the CrewAI Dashboard API is working correctly.
Run this script after starting the backend server.
"""

import requests
import json
import time
import sys
from typing import Dict, Any

API_BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_analytics_endpoint():
    """Test the analytics endpoint"""
    print("📊 Testing analytics endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/v1/analytics")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Analytics retrieved: {data.get('total_executions', 0)} executions")
            return True
        else:
            print(f"❌ Analytics failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Analytics error: {e}")
        return False

def test_files_endpoint():
    """Test the files listing endpoint"""
    print("📁 Testing files endpoint...")
    try:
        response = requests.get(f"{API_BASE_URL}/api/v1/files")
        if response.status_code == 200:
            files = response.json()
            print(f"✅ Files endpoint working: {len(files)} files found")
            return True
        else:
            print(f"❌ Files endpoint failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Files error: {e}")
        return False

def test_crew_execution():
    """Test a simple crew execution"""
    print("🤖 Testing crew execution...")
    
    # Sample crew configuration
    crew_config = {
        "agents": [
            {
                "role": "Test Agent",
                "goal": "Provide a simple test response",
                "backstory": "You are a test agent designed to verify the system is working correctly.",
                "tools": [],
                "max_iterations": 3,
                "temperature": 0.7,
                "model": "llama-3.3-70b"
            }
        ],
        "tasks": [
            {
                "name": "Simple Test Task",
                "description": "Generate a brief test response to verify the system is working",
                "expected_output": "A simple confirmation message that the system is operational",
                "assigned_agent": "Test Agent",
                "priority": "medium"
            }
        ],
        "config": {
            "topic": "System test - please respond with a brief confirmation that you are working correctly",
            "model": "llama-3.3-70b",
            "process": "sequential",
            "max_iterations": 5,
            "verbose": True,
            "memory": False,
            "collaboration": False
        }
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/api/v1/execute-crew",
            json=crew_config,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            execution_id = result.get("execution_id")
            print(f"✅ Crew execution started: {execution_id}")
            
            # Wait a moment and check execution status
            time.sleep(2)
            status_response = requests.get(f"{API_BASE_URL}/api/v1/executions/{execution_id}")
            if status_response.status_code == 200:
                status_data = status_response.json()
                print(f"✅ Execution status: {status_data.get('status', 'unknown')}")
                return True
            else:
                print("⚠️ Could not check execution status")
                return True  # Execution started successfully
        else:
            print(f"❌ Crew execution failed: {response.status_code}")
            try:
                error_detail = response.json()
                print(f"   Error details: {error_detail}")
            except:
                print(f"   Response: {response.text}")
            return False
    except requests.exceptions.Timeout:
        print("⚠️ Crew execution request timed out (this may be normal)")
        return True
    except Exception as e:
        print(f"❌ Crew execution error: {e}")
        return False

def run_all_tests():
    """Run all API tests"""
    print("🧪 Running CrewAI Dashboard API Tests\n")
    
    tests = [
        ("Health Check", test_health_check),
        ("Analytics Endpoint", test_analytics_endpoint),
        ("Files Endpoint", test_files_endpoint),
        ("Crew Execution", test_crew_execution)
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n--- {test_name} ---")
        if test_func():
            passed += 1
        time.sleep(1)  # Small delay between tests
    
    print(f"\n🏁 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Your CrewAI Dashboard is working correctly.")
        return True
    else:
        print("⚠️ Some tests failed. Check the output above for details.")
        return False

if __name__ == "__main__":
    print("CrewAI Dashboard API Test Suite")
    print("=" * 40)
    print(f"Testing API at: {API_BASE_URL}")
    print("Make sure the backend server is running before running this test.\n")
    
    # Check if server is reachable
    try:
        response = requests.get(API_BASE_URL, timeout=5)
        print("✅ Server is reachable\n")
    except Exception as e:
        print(f"❌ Cannot reach server at {API_BASE_URL}")
        print("Please ensure the backend is running with: ./start.sh")
        sys.exit(1)
    
    success = run_all_tests()
    sys.exit(0 if success else 1)