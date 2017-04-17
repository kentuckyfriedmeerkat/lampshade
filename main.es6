// = IMPORTS: MISC ============================================================
import Path from 'path';

// = IMPORTS: SERVER ==========================================================
import Express from 'express';
import HTTP from 'http';
import SocketIOServer from 'socket.io';

import SocketHandler from './server/socketEvents';

// = IMPORTS: CONFIG
import Yargs from 'yargs';
import Config from './config.json';

// Parse commandline arguments
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

// Create the Express.js app and set up views
var app = Express();
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve the static routes defined in the config
for (let dir of Config.server.staticRoutes)
    app.use(`/${dir}`, Express.static(Path.join(__dirname, dir)));

// Serve the character generator and dashboard
app.get('/', (req, res) => res.render('cg'));
app.get(['/dash', '/dashboard'], (req, res) => res.render('dash'));

// Create an HTTP server from the app
var server = HTTP.createServer(app);

// Create a Socket.IO listener on the server
var socketListener = SocketIOServer.listen(server);

// Begin listening on the configured port, outputting status messages
server.listen(argv.port, () => {
    console.log('  Forge Graphics Server Gen2.5');
    console.log('  Listening on port', argv.port)
});

// Handle socket connections as defined in modules/socketEvents.es6
socketListener.on('connection', socket => SocketHandler(socket));
