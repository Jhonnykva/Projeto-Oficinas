const express = require('express');
const {
  registerCadeado,
  getCadeados,
  updateCadeado,
  getCadeado,
} = require('../controllers/cadeado');
const liberadorRouter = require('./liberador');
const userAuth = require('../middleware/userAuth');

const router = express.Router({ mergeParams: true });

router.use('/:id_cadeado/liberador', liberadorRouter);
router.route('/').get(userAuth, getCadeados).post(userAuth, registerCadeado);
router
  .route('/:id_cadeado')
  .get(userAuth, getCadeado)
  .put(userAuth, updateCadeado);

module.exports = router;
