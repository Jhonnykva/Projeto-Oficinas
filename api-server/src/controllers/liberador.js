const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Liberador = require('../models/Liberador');
const mongoose = require('mongoose');
const QrCode = require('qrcode');
// @description   Retorna todos os liberadores do cadeado
// @route         GET /cadeado/liberador?id_cadeado=
// @access        Privada
exports.getLiberadores = asyncHandler(async (req, res, next) => {
  const id_cadeado = req.params.id_cadeado || req.query.id_cadeado;

  if (typeof id_cadeado !== 'string')
    return next(new ErrorResponse('Cadeado inválido', 400));

  const cadeado = await Liberador.find({
    id_usuario: new mongoose.Types.ObjectId(req.user.id),
    id_cadeado: new mongoose.Types.ObjectId(id_cadeado),
  }).sort('-createdAt');

  res.status(200).json({ data: cadeado });
});

// @description   Cadastra liberador
// @route         POST /liberador
// @access        Privada
exports.registerLiberador = asyncHandler(async (req, res, next) => {
  const cod_liberador = Liberador.getNewCodLiberador();
  const liberador = await Liberador.create({
    ...req.body,
    cod_liberador,
    id_usuario: req.user.id,
  });

  res.status(200).json({ data: liberador });
});

// @description   Obtem liberador por ID
// @route         POST /liberador/:id_liberador
// @access        Privada
exports.getLiberador = asyncHandler(async (req, res, next) => {
  const id = req.params.id_liberador;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let liberador = await Liberador.findById(id);

  if (!liberador)
    return next(new ErrorResponse(`Liberador ${id} não encontrado`, 404));

  if (String(liberador.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  res.status(200).json({ data: liberador });
});

// @description   Atualiza dados do liberador
// @route         POST /liberador/:id_liberador
// @access        Privada
exports.updateLiberador = asyncHandler(async (req, res, next) => {
  const id = req.params.id_liberador;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let liberador = await Liberador.findById(id);

  if (!liberador)
    return next(new ErrorResponse(`Liberador ${id} não encontrado`, 404));

  if (String(liberador.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  liberador = await Liberador.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ data: liberador });
});

// @description   Obtem códifo QR do liberador por ID
// @route         POST /liberador/:id_liberador/qr
// @access        Privada
exports.getLiberadorQR = asyncHandler(async (req, res, next) => {
  const id = req.params.id_liberador;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let liberador = await Liberador.findById(id);

  if (!liberador)
    return next(new ErrorResponse(`Liberador ${id} não encontrado`, 404));

  if (String(liberador.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  const qr = await QrCode.toDataURL(liberador.cod_liberador);
  res.status(200).json({ data: qr });
});

// @description   Retorna se o id do liberador é válido
// @route         POST /liberador/:id_liberador/valido
// @access        Privada (Cadeado)
exports.isLiberadorVálido = asyncHandler(async (req, res, next) => {
  const id = req.params.id_liberador;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let liberador = await Liberador.findById(id);
  if (!liberador)
    return next(new ErrorResponse(`Liberador ${id} não encontrado`, 404));

  if (!liberador.ativo)
    return next(new ErrorResponse(`Liberador ${id} inválido`, 400));

  res.status(200).json({ valido: true });
});
