module.exports = {
  attributes: {
    position: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    boardId: {
      model: 'Board',
      required: true,
      columnName: 'board_id',
    },
    cards: {
      collection: 'Card',
      via: 'listId',
    },
  },
};
