const express = require('express');
const { login, registerUsuario } = require('../controllers/usuario');

const router = express.Router();

router.route('/').post(registerUsuario);
router.route('/login').post(login);

module.exports = router;
