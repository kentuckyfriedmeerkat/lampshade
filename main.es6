import Express from 'express';
import HTTP from 'http';

import Path from 'path';

var argv = {
    port: 3000
};

var app = Express();
for (let dir of [
    'public',
    'node_modules'
]) app.use(`/${dir}`, Express.static(Path.join(__dirname, dir)));

var server = HTTP.createServer(app);
server.listen(argv.port, () => {
    console.log('Listening on port', argv.port)
});
