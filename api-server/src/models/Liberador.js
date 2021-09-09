const mongoose = require('mongoose');
const crypto = require('crypto');

const LiberadorSchema = mongoose.Schema(
  {
    cod_liberador: {
      type: String,
      required: true,
      unique: true,
    },
    alias: {
      type: String,
      require: true,
    },
    id_usuario: {
      type: mongoose.Schema.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    id_cadeado: {
      type: mongoose.Schema.ObjectId,
      ref: 'Cadeado',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Gera key do código
LiberadorSchema.statics.getNewCodLiberador = () => {
  return crypto.randomBytes(8).toString('hex');
};

module.exports = mongoose.model('Liberador', LiberadorSchema);
