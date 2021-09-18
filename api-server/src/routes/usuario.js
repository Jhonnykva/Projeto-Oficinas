const express = require('express');
const { login, registerUsuario, getMe } = require('../controllers/usuario');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

router.route('/').post(registerUsuario);
router.route('/login').post(login);
router.route('/me').get(userAuth, getMe);

module.exports = router;
