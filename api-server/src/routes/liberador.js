const express = require('express');
const {
  registerLiberador,
  getLiberadores,
  updateLiberador,
  getLiberador,
  getLiberadorQR,
  isLiberadorV├ílido,
} = require('../controllers/liberador');
const userAuth = require('../middleware/userAuth');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(userAuth, getLiberadores)
  .post(userAuth, registerLiberador);
router
  .route('/:id_liberador')
  .get(userAuth, getLiberador)
  .put(userAuth, updateLiberador);
router.route('/:id_liberador/qr').get(userAuth, getLiberadorQR);
router.route('/:id_liberador/valido').get(isLiberadorV├ílido);
module.exports = router;
