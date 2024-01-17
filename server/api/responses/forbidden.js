module.exports = function forbidden(message) {
  const { res } = this;

  return res.status(403).json({
    code: 'E_FORBIDDEN',
    message,
  });
};
