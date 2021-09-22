const mongoose = require('mongoose');
const crypto = require('crypto');

const CadeadoSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    id_usuario: {
      type: mongoose.Schema.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    estado: {
      type: String,
      required: true,
      default: 'Desbloqueado',
    },
    associado: {
      type: Boolean,
      required: true,
      default: false,
    },
    public_key: {
      type: String,
      required: true,
      unique: true,
    },
    private_key: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

CadeadoSchema.virtual('liberadores', {
  ref: 'Liberador',
  localField: '_id',
  foreignField: 'id_cadeado',
  justOne: false,
});

CadeadoSchema.virtual('eventos', {
  ref: 'Evento',
  localField: '_id',
  foreignField: 'id_cadeado',
  justOne: false,
});

// Gera public & private ky
CadeadoSchema.statics.getNewKeys = () => {
  const public_key = crypto.randomBytes(2).toString('hex');
  const private_key = crypto.randomBytes(2).toString('hex');
  return { public_key, private_key };
};

module.exports = mongoose.model('Cadeado', CadeadoSchema);
