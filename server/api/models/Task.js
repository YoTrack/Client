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
    isCompleted: {
      type: 'boolean',
      defaultsTo: false,
      columnName: 'is_completed',
    },
    cardId: {
      model: 'Card',
      required: true,
      columnName: 'card_id',
    },
    dueDate: {
      type: 'ref',
      columnName: 'due_date',
    },
    duration: {
      type: 'number',
      required: false,
      allowNull: true,
      columnName: 'duration',
    },
  },
};
