module.exports = {
  async fn() {
    const { currentUser } = this.req;
    const cardIds = await sails.helpers.cards.getCardsIds(currentUser.id);
    const userCards = await sails.helpers.cards.getMany(cardIds);
    const cardMemberships = await sails.helpers.cards.getCardMemberships(cardIds);
    const cardLabels = await sails.helpers.cards.getCardLabels(cardIds);
    const tasks = await sails.helpers.cards.getTasks(cardIds);
    const attachments = await sails.helpers.cards.getAttachments(cardIds);
    return {
      items: userCards,
      included: {
        cardMemberships,
        cardLabels,
        tasks,
        attachments,
      },
    };
  },
};
