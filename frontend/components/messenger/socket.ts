import io from 'socket.io-client';
const WEBSOCKET_URL=process.env.NEXT_PUBLIC_WEBSOCKET_URL||""

 export const socket = io(WEBSOCKET_URL, { transports: ['websocket', 'polling', 'flashsocket'] });