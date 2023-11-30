import { io, Socket } from 'socket.io-client';
import { SOCKET_URLS } from '../utils/config';


export default class SocketClient {
    sockets: { [key: string]: Socket } = {};

    connect(socketName: string) {
        const socketUrl: string = SOCKET_URLS[socketName];
        if (socketUrl) {
            this.sockets[socketName] = io(socketUrl);
        } else {
            console.error(`Socket URL not found for socketName: ${socketName}`);
        }
    }

    disconnect(socketName: string) {
        const socket = this.sockets[socketName];
        if (socket) {
            socket.disconnect();
            delete this.sockets[socketName];
        }
    }

    emit(socketName: string, eventName: string, data: any) {
        const socket = this.sockets[socketName];
        if (socket) {
            socket.emit(eventName, data);
        }
    }

    on(socketName: string, eventName: string, func: (data: any) => void) {
        const socket = this.sockets[socketName];
        if (socket) {
            socket.on(eventName, func);
        }
    }
}
