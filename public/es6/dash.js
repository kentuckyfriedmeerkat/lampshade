import $ from 'jquery';
import SocketIOClient from 'socket.io-client';

var Socket = SocketIOClient.connect();

$('#trigger').click(() => Socket.emit('trigger'));
