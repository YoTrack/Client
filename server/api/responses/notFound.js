module.exports = function notFound(message) {
  const { res } = this;

  return res.status(404).json({
    code: 'E_NOT_FOUND',
    message,
  });
};
