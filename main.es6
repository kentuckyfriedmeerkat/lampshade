import Express from 'express';
import HTTP from 'http';
import SocketIOServer from 'socket.io';

import Path from 'path';
import Yargs from 'yargs';

import SocketHandler from './modules/socketEvents';

import Config from './config.json';
var argv = Yargs
    .usage('Usage: $0 [options]')
    .option('port', {
        alias: 'p',
        describe: 'Port to listen on',
        default: Config.server.defaults.port,
        type: 'number',
        nargs: 1
    })
    .help('h').alias('h', 'help')
    .argv;

var app = Express();
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'pug');

for (let dir of Config.server.staticRoutes)
    app.use(`/${dir}`, Express.static(Path.join(__dirname, dir)));
app.get('/', (req, res) => res.render('cg'));
app.get(['/dash', '/dashboard'], (req, res) => res.render('dash'));

var server = HTTP.createServer(app);
var socketListener = SocketIOServer.listen(server);
server.listen(argv.port, () => {
    console.log('  Forge Graphics Server Gen2.5');
    console.log('  Listening on port', argv.port)
});

socketListener.on('connection', socket => SocketHandler(socket));
