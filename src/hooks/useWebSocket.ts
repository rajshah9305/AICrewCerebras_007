'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(url);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [url]);

  const sendMessage = (message: any) => {
    socketRef.current?.emit('message', message);
  };

  return { isConnected, messages, sendMessage };
}