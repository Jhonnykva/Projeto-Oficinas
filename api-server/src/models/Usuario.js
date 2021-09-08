mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsuarioSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    sobrenome: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
    pass: {
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

// Gera hash de password cada vez que muda
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('pass')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.pass = await bcrypt.hash(this.pass, salt);
});

// Sign JWT and return
UsuarioSchema.methods.getSignedJwtToken = function (time = '1d') {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: time,
  });
};

// Match user entered password to hashed password in db
UsuarioSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.pass);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
