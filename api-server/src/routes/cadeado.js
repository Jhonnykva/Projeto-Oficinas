const express = require('express');
const {
  registerCadeado,
  getCadeados,
  updateCadeado,
  getCadeado,
  isDesbloqueado,
  desbloquearCadeado,
  getcadeadoConfigQR,
  checkQrCode,
  readCofingQrCode,
} = require('../controllers/cadeado');
const liberadorRouter = require('./liberador');
const userAuth = require('../middleware/userAuth');
const cadeadoAuth = require('../middleware/cadeadoAuth');

const router = express.Router({ mergeParams: true });

router.use('/:id_cadeado/liberador', liberadorRouter);
router.route('/').get(userAuth, getCadeados).post(userAuth, registerCadeado);
router.route('/me/desbloqueado').get(cadeadoAuth, isDesbloqueado);
router.route('/me/desbloquear').get(cadeadoAuth, desbloquearCadeado);
router
  .route('/:id_cadeado')
  .get(userAuth, getCadeado)
  .put(userAuth, updateCadeado);
router.route('/:id_cadeado/config_qr').post(userAuth, getcadeadoConfigQR);
router.route('/me/liberar').post(cadeadoAuth, checkQrCode);
router.route('/decode_config_qr').post(readCofingQrCode);
module.exports = router;
