const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Cadeado = require('../models/Cadeado');
const Evento = require('../models/Evento');
const mongoose = require('mongoose');
const QrCode = require('qrcode');

// @description   Retorna todos os eventos do cadeado
// @route         GET /evento?id_cadeado=
// @access        Privada
exports.getEventos = asyncHandler(async (req, res, next) => {
  const id_cadeado = req.params.id_cadeado || req.query.id_cadeado;

  if (typeof id_cadeado !== 'string')
    return next(new ErrorResponse('Cadeado inválido', 400));

  const cadeado = await Evento.find({
    id_usuario: new mongoose.Types.ObjectId(req.user.id),
    id_cadeado: new mongoose.Types.ObjectId(id_cadeado),
  });

  res.status(200).json({ data: cadeado });
});

// @description   Registra evento
// @route         POST /evento
// @access        Privada
exports.registerEvento = asyncHandler(async (req, res, next) => {
  const cadeado = await Cadeado.findById(req.body.id_cadeado);
  if (!cadeado)
    return next(
      new ErrorResponse(`Cadeado ${req.body.id_cadeado} não encontrado`, 404)
    );
  if (String(cadeado.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Operação não permitida`, 403));

  const evento = await Evento.create({
    ...req.body,
    id_usuario: req.user.id,
  });

  res.status(200).json({ data: evento });
});

// @description   Registra evento predeterminados
// @route         POST /evento/p/:id_tipo_evento
// @access        Privada
exports.registerEventoPredeterminado = asyncHandler(async (req, res, next) => {
  const idTipoEvento = req.params.id_tipo_evento;

  if (!req.cadeado || !req.cadeado.id)
    return next(new ErrorResponse('Não autorizado'), 401);

  const cadeado = await Cadeado.findById(req.cadeado.id);

  if (!cadeado) return next(new ErrorResponse('Não autorizado'), 401);

  let evento = null;
  switch (idTipoEvento) {
    // Giroscopio detectou movimento não esperado
    case '100':
      evento = await Evento.create({
        id_usuario: cadeado.id_usuario,
        id_cadeado: req.cadeado.id,
        titulo: 'Movimento inesperado detectado',
        info: `O cadeado ${req.cadeado.id} detectou movimentos inesperados. Possível manipulação não autorizada.`,
        tipo: 'critical',
      });
      break;
    default:
      return next(
        new ErrorResponse(`Tipo evento ${idTipoEvento} inválido`, 400)
      );
  }

  res.status(200).json({ data: evento.id });
});
