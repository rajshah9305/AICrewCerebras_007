import { NextResponse } from 'next/server';

export async function POST() {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      const messages = [
        'Starting workflow execution...',
        'Initializing agents...',
        'Research Agent: Beginning analysis...',
        'Writer Agent: Preparing content...',
        'Research Agent: Data collection complete',
        'Writer Agent: Content generation finished',
        'Workflow execution completed!'
      ];

      let index = 0;
      const interval = setInterval(() => {
        if (index < messages.length) {
          const data = JSON.stringify({
            message: messages[index],
            timestamp: new Date().toISOString()
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          index++;
        } else {
          clearInterval(interval);
          controller.close();
        }
      }, 1000);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}