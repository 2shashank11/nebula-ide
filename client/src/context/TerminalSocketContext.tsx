import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { createTerminalSocket } from '@/socket';

interface TerminalSocketContextType {
  socket: Socket | null;
}

const TerminalSocketContext = createContext<TerminalSocketContextType>({
  socket: null,
});

export const useTerminalSocket = () => useContext(TerminalSocketContext);

interface Props {
  projectId: string;
  children: React.ReactNode;
}

export const TerminalSocketProvider: React.FC<Props> = ({ projectId, children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = createTerminalSocket(projectId);
    setSocket(socketInstance);

    // return () => {
    //   socketInstance.disconnect();
    // };
  }, [projectId]);

  return (
    <TerminalSocketContext.Provider value={{ socket }}>
      {children}
    </TerminalSocketContext.Provider>
  );
};