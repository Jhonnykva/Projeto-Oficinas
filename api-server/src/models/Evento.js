const mongoose = require('mongoose');
const crypto = require('crypto');

const EventoSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      require: true,
    },
    id_cadeado: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cadeado',
      required: true,
    },
    id_usuario: {
      type: mongoose.Schema.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ['info', 'warn', 'critical'],
      default: 'info',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model('Evento', EventoSchema);
