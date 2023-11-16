module.exports = function conflict(message) {
  const { res } = this;

  return res.status(409).json({
    code: 'E_CONFLICT',
    message,
  });
};
