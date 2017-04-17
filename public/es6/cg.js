import $ from 'jquery';
import SocketIOClient from 'socket.io-client';

var Socket = SocketIOClient.connect();

Socket.on('trigger', () => $('#item').hide());
