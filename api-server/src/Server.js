const express = require('express');
const fileUpload = require('express-fileupload');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const { initRoutes } = require('./routes');
const { connectDB, disconnectDB } = require('./database/Database');

const Server = () => {
  const PORT = process.env.PORT || 5000;

  // Conectar com banco de dados
  connectDB();

  // Inicia express
  const app = express();
  app.disable('x-powered-by');

  app.use(cors());

  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    })
  );

  // Body parser
  app.use(express.json({ limit: '50mb', extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  // Variables
  let server = undefined;
  // Init Routes
  initRoutes(app);
  // Controlador de erros nao tratados
  app.use(errorHandler);

  const start = () => {
    server = app.listen(PORT, servidorIniciadoCallback);
  };

  const stop = async () => {
    console.log(`Parando servidor.`.red.bold);
    disconnectDB();
  };

  const servidorIniciadoCallback = () => {
    console.log(`Servidor iniciado on porta ${PORT} (http)`.green.bold);
    // Notify PM2 that server started
    if (typeof process.send === 'function') process.send('ready');
  };
  return {
    start,
    stop,
  };
};

module.exports = Server;
