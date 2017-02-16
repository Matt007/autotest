var Server = require('./lib/server');

var environment = require('./environments/development');



UIServer = new Server(environment);


UIServer.boot();