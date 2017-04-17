import Express from 'express';
import HTTP from 'http';

import Path from 'path';
import Yargs from 'yargs';

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

    console.log(argv);

var app = Express();
app.set('views', Path.join(__dirname, 'views'));
app.set('view engine', 'pug');

for (let dir of [
    'public',
    'node_modules'
]) app.use(`/${dir}`, Express.static(Path.join(__dirname, dir)));
app.get('/', (req, res) => res.render('cg'));

var server = HTTP.createServer(app);
server.listen(argv.port, () => {
    console.log('Listening on port', argv.port)
});
