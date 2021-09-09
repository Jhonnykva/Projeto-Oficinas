const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Usuario = require('../models/Usuario');

module.exports = asyncHandler(async (req, res, next) => {
  let token;
  req.user = undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Make sure token exist
  if (!token) {
    return next(new ErrorResponse('Não autorizado', 401));
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verifica si es usuario cliente
    req.user = await Usuario.findById(decoded.id);
    return next();
  } catch (err) {
    console.error(err);
  }
  next(new ErrorResponse('Não autorizado', 401));
});

// Grant access to specific roles
exports.authorize = (...tipos) => {
  return (req, res, next) => {
    if (!tipos.includes(req.user.tipo_usuario)) {
      return next(new ErrorResponse(`Unauthorized`, 403));
    }
    next();
  };
};
