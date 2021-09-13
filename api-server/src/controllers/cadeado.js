const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Cadeado = require('../models/Cadeado');
const mongoose = require('mongoose');

// @description   Retorna todos os cadeados associados ao usuario
// @route         GET /cadeado
// @access        Privada
exports.getCadeados = asyncHandler(async (req, res, next) => {
  const cadeado = await Cadeado.find({
    id_usuario: new mongoose.Types.ObjectId(req.user.id),
  });

  res.status(200).json({ data: cadeado });
});

// @description   Cadastra cadeado
// @route         POST /cadeado
// @access        Privada
exports.registerCadeado = asyncHandler(async (req, res, next) => {
  const { public_key, private_key } = Cadeado.getNewKeys();
  const cadeado = await Cadeado.create({
    ...req.body,
    public_key,
    private_key,
    id_usuario: req.user.id,
  });

  res.status(200).json({ data: cadeado });
});

// @description   Obtem cadeado por ID
// @route         POST /cadeado/:id_cadeado
// @access        Privada
exports.getCadeado = asyncHandler(async (req, res, next) => {
  const id = req.params.id_cadeado;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let cadeado = await Cadeado.findById(id);

  if (!cadeado)
    return next(new ErrorResponse(`Cadeado ${id} não encontrado`, 404));

  if (String(cadeado.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  res.status(200).json({ data: cadeado });
});

// @description   Atualiza dados do cadeado
// @route         POST /cadeado/:id_cadeado
// @access        Privada
exports.updateCadeado = asyncHandler(async (req, res, next) => {
  const id = req.params.id_cadeado;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let cadeado = await Cadeado.findById(id);

  if (!cadeado)
    return next(new ErrorResponse(`Cadeado ${id} não encontrado`, 404));

  if (String(cadeado.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  cadeado = await Cadeado.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ data: cadeado });
});

// @description   Retorna se o cadeado está desbloqueado
// @route         POST /cadeado/me/desbloqueado
// @access        Privada
exports.isDesbloqueado = asyncHandler(async (req, res, next) => {
  const id = req.cadeado ? req.cadeado.id : null;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let cadeado = await Cadeado.findById(id);

  if (!cadeado)
    return next(new ErrorResponse(`Cadeado ${id} não encontrado`, 404));

  if (String(cadeado.estado).toLowerCase() !== 'desbloqueado')
    return next(new ErrorResponse(`Cadeado ${id} não desbloqueado`, 400));

  res.status(200).json({ estado: cadeado.estado });
});
