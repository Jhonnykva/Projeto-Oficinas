const cadeado = require('./cadeado');
const usuario = require('./usuario');

const initRoutes = (app) => {
  const BASE_URL = process.env.BASE_URL || '/api/v1';
  // Rutas
  app.use(`${BASE_URL}/usuario`, usuario);
  app.use(`${BASE_URL}/cadeado`, cadeado);

  // Verificação de conexão
  app.get(`${BASE_URL}/testconn`, (req, res, next) =>
    res.status(200).json({ success: true })
  );
};
module.exports.initRoutes = initRoutes;
