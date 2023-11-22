const Roles = {
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

module.exports = {
  Roles,

  attributes: {
    role: {
      type: 'string',
      isIn: Object.values(Roles),
      required: true,
    },
    canComment: {
      type: 'boolean',
      allowNull: true,
      columnName: 'can_comment',
    },
    boardId: {
      model: 'Board',
      required: true,
      columnName: 'board_id',
    },
    userId: {
      model: 'User',
      required: true,
      columnName: 'user_id',
    },
  },

  tableName: 'board_membership',
};
