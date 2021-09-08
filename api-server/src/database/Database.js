const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB Conectado: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error(err.message);
  }
};

const disconnectDB = async () => {
  mongoose.connection.close(() => {
    console.log(`MongoDB Desconectado`.cyan.underline.bold);
  });
};

module.exports.connectDB = connectDB;
module.exports.disconnectDB = disconnectDB;
