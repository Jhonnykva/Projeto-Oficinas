const express = require('express');
const {
  registerEvento,
  registerEventoPredeterminado,
  getEventos,
} = require('../controllers/evento');
const userAuth = require('../middleware/userAuth');
const cadeadoAuth = require('../middleware/cadeadoAuth');

const router = express.Router({ mergeParams: true });

router.route('/').get(userAuth, getEventos).post(userAuth, registerEvento);

router
  .route('/p/:id_tipo_evento')
  .post(cadeadoAuth, registerEventoPredeterminado);

module.exports = router;
