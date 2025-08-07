import { io, Socket } from 'socket.io-client';
import { socketEndpoint } from '@/api/sandbox-axios';

export function createTerminalSocket(projectId: string): Socket {
    const socket = io(socketEndpoint, {
        path: '/terminal/socket.io',
        query: { projectId },
        transports: ['websocket'],
        withCredentials: true,
    });

    return socket;

}