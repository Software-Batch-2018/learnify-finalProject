import io from 'socket.io-client';
import { API } from '../query/api';

export const SOCKET = io(`http://192.168.1.71:3334`, {
    transports: ['websocket'], 
  });