module.exports = function unprocessableEntity(message) {
  const { res } = this;

  return res.status(422).json({
    code: 'E_UNPROCESSABLE_ENTITY',
    message,
  });
};
