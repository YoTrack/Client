const Types = {
  CREATE_CARD: 'createCard',
  MOVE_CARD: 'moveCard',
  COMMENT_CARD: 'commentCard',
};

module.exports = {
  Types,

  attributes: {
    type: {
      type: 'string',
      isIn: Object.values(Types),
      required: true,
    },
    data: {
      type: 'json',
      required: true,
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
};
