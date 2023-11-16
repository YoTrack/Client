module.exports = function unauthorized(message) {
  const { res } = this;

  return res.status(401).json({
    code: 'E_UNAUTHORIZED',
    message,
  });
};
