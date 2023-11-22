module.exports = {
  attributes: {
    fromModel: {
      type: 'string',
      required: true,
      columnName: 'from_model',
    },
    originalRecordId: {
      type: 'string',
      required: true,
      columnName: 'original_record_id',
    },
    originalRecord: {
      type: 'json',
      required: true,
      columnName: 'original_record',
    },
  },

  archiveModelIdentity: false,
};
