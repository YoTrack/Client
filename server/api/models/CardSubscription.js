module.exports = {
  attributes: {
    isPermanent: {
      type: 'boolean',
      defaultsTo: true,
      columnName: 'is_permanent',
    },
    cardId: {
      model: 'Card',
      required: true,
      columnName: 'card_id',
    },
    userId: {
      model: 'User',
      required: true,
      columnName: 'user_id',
    },
  },

  tableName: 'card_subscription',
};
