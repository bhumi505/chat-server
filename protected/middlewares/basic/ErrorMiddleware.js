module.exports = function(err, req, res, next) {
  const status = err.status || 500;

  req.logger.error(status, err);

  res.status(status);
  res.answerWith(status, err.message);
};
