import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const WebSocketContext = createContext(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};


export const WebSocketProvider = ({
  children,
}) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
      const socketIo = io(
        'http://localhost:4000',
      );

      socketIo.on('connect', () => {
        console.log('Connected to WebSocket server');
        setIsConnected(true);
      });

      socketIo.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        setIsConnected(false);
      });

      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
      };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </WebSocketContext.Provider>
  );
};