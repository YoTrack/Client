const ImportTypes = {
  TRELLO: 'trello',
};

module.exports = {
  ImportTypes,

  attributes: {
    position: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    projectId: {
      model: 'Project',
      required: true,
      columnName: 'project_id',
    },
    memberUsers: {
      collection: 'User',
      via: 'boardId',
      through: 'BoardMembership',
    },
    lists: {
      collection: 'List',
      via: 'boardId',
    },
    labels: {
      collection: 'Label',
      via: 'boardId',
    },
  },
};
