module.exports = (err, req, res, next) => {
  const message = error.message;
  const statusCode = error.statusCode || 500;
  const data = error.data;
  res.json({ message, statusCode, data });
};
