const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Cadeado = require('../models/Cadeado');

module.exports = asyncHandler(async (req, res, next) => {
  let private_key = null,
    public_key = null;
  req.user = undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Basic')
  ) {
    const base64 = Buffer.from(
      req.headers.authorization.split(' ')[1],
      'base64'
    );
    const info = base64.toString('utf8').split(':');
    if (info.length >= 2) {
      public_key = info[0];
      private_key = info[1];
    }
  }

  if (private_key === null || public_key === null) {
    return next(new ErrorResponse('Não autorizado', 401));
  }
  try {
    req.cadeado = await Cadeado.findOne({
      private_key,
      public_key,
    });
    if (!req.cadeado) return next(new ErrorResponse('Não autorizado', 401));
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
