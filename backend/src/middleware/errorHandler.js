const errorHandler = (err, req, res, next) => {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;

  if (statusCode === 500) {
    return res.status(500).json({ message: 'Lỗi máy chủ nội bộ', error: err.message });
  }

  res.status(statusCode).json({ message: err.message });
};

module.exports = errorHandler;
