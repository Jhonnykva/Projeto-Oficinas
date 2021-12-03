const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Usuario = require('../models/Usuario');

// @description   Retorna token de acesso para usuário válido
// @route         POST /usuario/login
// @access        Publico
exports.login = asyncHandler(async (req, res, next) => {
  let { alias, pass, rememberMe } = req.body;

  if (!alias || !pass) {
    return next(new ErrorResponse('Digite seu usuario e senha', 400));
  }

  const user = await Usuario.findOne({
    alias,
  }).select('+pass');

  if (!user) {
    return next(new ErrorResponse('Usuario/Senha incorreta.', 401));
  }

  const passOk = await user.matchPassword(pass);

  if (!passOk) {
    return next(new ErrorResponse('Usuario/Senha incorreta.', 401));
  }

  let time = '1d';
  if (rememberMe) time = '30d';

  const token = user.getSignedJwtToken(time);

  res.status(200).json({ token });
});

// @description   Retorna informação do usuario
// @route         POST /usuario/me
// @access        Publico
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await Usuario.findById(req.user.id).select('-pass');

  res.status(200).json({ data: user });
});

// @description   Cadastra usuario
// @route         POST /usuario
// @access        Privada
exports.registerUsuario = asyncHandler(async (req, res, next) => {
  const user = await Usuario.create(req.body);

  res.status(200).json({ data: { ...user.toObject(), pass: undefined } });
});
