const idOrIdsValidator = (value) => _.isString(value) || _.every(value, _.isString);

module.exports = {
  inputs: {
    idOrIds: {
      type: 'json',
      custom: idOrIdsValidator,
      required: true,
    },
  },

  async fn(inputs) {
    const cardMemberships = await sails.helpers.users.getCardMemberships(inputs.idOrIds);
    return sails.helpers.utils.mapRecords(cardMemberships, 'cardId', true);
  },
};
