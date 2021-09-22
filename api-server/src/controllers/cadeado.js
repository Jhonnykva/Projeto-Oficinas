const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const Cadeado = require('../models/Cadeado');
const Evento = require('../models/Evento');
const mongoose = require('mongoose');
const jimp = require('jimp');
const Liberador = require('../models/Liberador');
const QrCodeReader = require('qrcode-reader');
const QrCode = require('qrcode');

// @description   Retorna todos os cadeados associados ao usuario
// @route         GET /cadeado
// @access        Privada
exports.getCadeados = asyncHandler(async (req, res, next) => {
  const cadeado = await Cadeado.find({
    id_usuario: new mongoose.Types.ObjectId(req.user.id),
  }).sort('-createdAt');

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

  let cadeado = await Cadeado.findById(id)
    .populate({ path: 'liberadores', options: { sort: '-createdAt' } })
    .populate({ path: 'eventos', options: { sort: '-createdAt' } });

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
  console.log(req.body);
  const id = req.params.id_cadeado;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let cadeado = await Cadeado.findById(id);

  if (!cadeado)
    return next(new ErrorResponse(`Cadeado ${id} não encontrado`, 404));

  if (String(cadeado.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  handleUpdateCadeadoEvents(cadeado, req.body, req.user);
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

// @description   Desbloqueia o cadeado caso seja fornecido um liberador válido
// @route         POST /cadeado/me/desbloquear?cod_liberador=
// @access        Privada
exports.desbloquearCadeado = asyncHandler(async (req, res, next) => {
  const id = req.cadeado ? req.cadeado.id : null;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let cadeado = await Cadeado.findById(id);

  if (!cadeado)
    return next(new ErrorResponse(`Cadeado ${id} não encontrado`, 404));

  if (typeof req.query.cod_liberador === 'string') {
    const cod_liberador = req.query.cod_liberador;
    const liberador = await Liberador.findOne({
      cod_liberador,
      id_cadeado: new mongoose.Types.ObjectId(id),
    });
    if (liberador && liberador.ativo) {
      // Liberador válido
      cadeado = await Cadeado.findByIdAndUpdate(
        id,
        { estado: 'Desbloqueado' },
        {
          new: true,
          runValidators: true,
        }
      );
      await Evento.create({
        titulo: `Cadeado Desbloqueado | Liberado por código QR`,
        info: `O cadeado ${req.cadeado.nome} foi Desbloqueado pelo liberador ${liberador.alias} (${liberador.id})`,
        id_cadeado: id,
        id_usuario: req.cadeado.id_usuario,
      });
      res.status(200).json({});
    } else {
      // Liberador inválido
      let info = `O cadeado ${req.cadeado.nome}`;
      if (liberador)
        info =
          info +
          ` pelo liberador <${liberador.alias}> desativado. (${liberador.id})`;
      else info = info + ` por um liberador inválido.`;

      await Evento.create({
        titulo: `Uso de liberador inválido`,
        info,
        id_cadeado: id,
        id_usuario: req.cadeado.id_usuario,
        tipo: 'warn',
      });
    }
  }

  return next(new ErrorResponse('Liberador inválido', 400));
  //res.status(400).json({ estado: cadeado.estado });
});

const handleUpdateCadeadoEvents = async (original, updatedFields, user) => {
  if (!original.id) return;
  try {
    if (
      typeof updatedFields.estado !== 'undefined' &&
      original.estado !== updatedFields.estado
    ) {
      const { estado } = updatedFields;
      const { id_usuario, id } = original;
      const { alias } = user;
      await Evento.create({
        titulo: `Cadeado ${estado} | App Web`,
        info: `O cadeado foi <${estado}> pelo usuario "${alias}".`,
        id_cadeado: id,
        id_usuario,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

// @description   Obtem código QR para configurar cadeado
// @route         POST /cadeado/:id_cadeado/config_qr
// @access        Privada
exports.getcadeadoConfigQR = asyncHandler(async (req, res, next) => {
  const id = req.params.id_cadeado;
  if (typeof id !== 'string')
    return next(new ErrorResponse('ID inválido', 400));

  let cadeado = await Cadeado.findById(id);

  if (!cadeado)
    return next(new ErrorResponse(`Cadeado ${id} não encontrado`, 404));

  if (String(cadeado.id_usuario) !== String(req.user.id))
    return next(new ErrorResponse(`Não autorizado`, 403));

  const token = Buffer.from(
    `${cadeado.public_key}:${cadeado.private_key}`
  ).toString('base64');

  const qr = await QrCode.toDataURL(
    `${token};${req.body.ssid};${req.body.pass}`,
    { errorCorrectionLevel: 'L', width: 500 }
  );
  res.status(200).json({ data: qr });
});

// @description   Recebe imagem e verifica se existe um liberador
// @route         POST /cadeado/me/liberar
// @access        Privada
exports.checkQrCode = asyncHandler(async (req, res, next) => {
  const id = req.cadeado.id;
  console.log(id);
  if (!id) return next(new ErrorResponse('Não autorizado', 401));

  var qrI = new QrCodeReader();
  const filePath = `./public/qr-codes/file-${Date.now()}.jpg`;

  if (!req.files.imageFile)
    return next(new ErrorResponse('Código inválido', 400));

  await req.files.imageFile.mv(filePath);
  const img = await jimp.read(filePath);
  qrI.callback = async function (err, value) {
    try {
      if (err) {
        console.error(err);
        // TODO handle error
        return next(new ErrorResponse('Código inválido', 400));
      }
      console.log(value.result);
      console.log(value);
      const cod_liberador = value.result;
      const liberador = await Liberador.findOne({
        cod_liberador,
        id_cadeado: new mongoose.Types.ObjectId(id),
      });
      if (liberador && liberador.ativo) {
        // Liberador válido
        cadeado = await Cadeado.findByIdAndUpdate(
          id,
          { estado: 'Desbloqueado' },
          {
            new: true,
            runValidators: true,
          }
        );
        await Evento.create({
          titulo: `Cadeado Desbloqueado | Liberado por código QR`,
          info: `O cadeado ${req.cadeado.nome} foi Desbloqueado pelo liberador ${liberador.alias} (${liberador.id})`,
          id_cadeado: id,
          id_usuario: req.cadeado.id_usuario,
        });
        return res.status(200).json({});
      } else {
        // Liberador inválido
        let info = `O cadeado ${req.cadeado.nome}`;
        if (liberador)
          info =
            info +
            ` pelo liberador <${liberador.alias}> desativado. (${liberador.id})`;
        else info = info + ` por um liberador inválido.`;

        await Evento.create({
          titulo: `Uso de liberador inválido`,
          info,
          id_cadeado: id,
          id_usuario: req.cadeado.id_usuario,
          tipo: 'warn',
        });
      }
      return next(new ErrorResponse('Código inválido', 400));
    } catch (err) {
      console.error(err);
      return next(new ErrorResponse('Código inválido', 400));
    }
  };
  await qrI.decode(img.bitmap);

  //res.status(200).json({ data: '' });
});
