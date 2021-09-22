const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  if (isNaN(error.statusCode) || error.statusCode >= 500) console.error(err);

  res.status(error.statusCode || 500).json({
    error: error.message,
  });
};

module.exports = errorHandler;
