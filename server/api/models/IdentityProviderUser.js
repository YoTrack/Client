module.exports = {
  attributes: {
    issuer: {
      type: 'string',
      isNotEmptyString: true,
      allowNull: true,
    },
    sub: {
      type: 'string',
      isNotEmptyString: true,
      allowNull: true,
    },
    userId: {
      model: 'User',
      required: true,
      columnName: 'user_id',
    },
  },

  tableName: 'identity_provider_user',
};
