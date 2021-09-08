const dotenv = require('dotenv');
const Server = require('./src/server');

// Carrega parametros
dotenv.config({ path: './config.env' });

// Inicia servidor
const server = Server();
server.start();

process.on('exit', function () {
  server.stop();
});

process.on('SIGINT', function () {
  server.stop();
  process.exit();
});
