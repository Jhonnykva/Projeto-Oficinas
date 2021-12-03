const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Cadeado = require('../models/Cadeado');
const Evento = require('../models/Evento');
const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');
const QrCode = require('qrcode');
const { query } = require('express');
const { sendNotification } = require('../mail/sendNotification');


// @description   Retorna todos os eventos do cadeado
// @route         GET /evento?id_cadeado=
// @access        Privada
exports.getEventos = asyncHandler(async (req, res, next) => {
  const id_cadeado = req.params.id_cadeado || req.query.id_cadeado;

  if (!req.user || typeof req.user.id !== 'string')
    return next(new ErrorResponse('Não autorizado', 401));

  const query = {
    id_usuario: new mongoose.Types.ObjectId(req.user.id),
  };

  if (id_cadeado) query.id_cadeado = new mongoose.Types.ObjectId(id_cadeado);

  const eventos = await Evento.find(query).sort('-createdAt').limit(50);

  res.status(200).json({ data: eventos });
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

// @description   Registra eventos predeterminados
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
    case '410':
      evento = await Evento.create({
        id_usuario: cadeado.id_usuario,
        id_cadeado: req.cadeado.id,
        titulo: 'Bateria fraca',
        info: `O cadeado ${req.cadeado.nome} foi desligado, pois foi detectado um baixo nível de carga.`,
        tipo: 'critical',
      });
      break;
    // Giroscopio detectou movimento não esperado
    case '404':
      evento = await Evento.create({
        id_usuario: cadeado.id_usuario,
        id_cadeado: req.cadeado.id,
        titulo: 'Movimento inesperado detectado',
        info: `O cadeado ${req.cadeado.nome} detectou movimentos inesperados. Possível manipulação não autorizada.`,
        tipo: 'critical',
      });
      break;
    case '402':
      break;
    case '403':
      break;
    case '401':
      break;
    default:
      return next(
        new ErrorResponse(`Tipo evento ${idTipoEvento} inválido`, 400)
      );
  }
  if (evento !== null) {
    const user = await Usuario.findById(evento.id_usuario).select('email');
    if (user !== null){
      sendNotification(user.email, evento.titulo, evento.info);
    }
  }

  res.status(200).json({ data: evento ? evento.id : null });
});
