const express = require('express');
const {
  registerCadeado,
  getCadeados,
  updateCadeado,
  getCadeado,
} = require('../controllers/cadeado');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.route('/').get(userAuth, getCadeados).post(userAuth, registerCadeado);
router.route('/:id').get(userAuth, getCadeado).put(userAuth, updateCadeado);

module.exports = router;
