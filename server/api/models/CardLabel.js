module.exports = {
  attributes: {
    cardId: {
      model: 'Card',
      required: true,
      columnName: 'card_id',
    },
    labelId: {
      model: 'Label',
      required: true,
      columnName: 'label_id',
    },
  },

  tableName: 'card_label',
};
