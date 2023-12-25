const initKnex = require('knex');

const knexfile = require('../../../db/knexfile');

const knex = initKnex(knexfile);

async function recordsGet(userId, date) {
  return knex
    .select('card.id')
    .from('card')
    .innerJoin('card_membership', 'card.id', '=', 'card_membership.card_id')
    .where('card_membership.user_id', userId)
    .andWhere('card.due_date', '>=', date)
    .then((it) => it.map((prop) => prop.id));
}

module.exports = {
  async fn() {
    const { currentUser } = this.req;
    const date = new Date();
    const userCardIds = await recordsGet(currentUser.id, date);
    const userCards = await sails.helpers.cards.getMany(userCardIds);
    const cardMemberships = await sails.helpers.cards.getCardMemberships(userCardIds);
    const cardLabels = await sails.helpers.cards.getCardLabels(userCardIds);
    const tasks = await sails.helpers.cards.getTasks(userCardIds);
    const attachments = await sails.helpers.cards.getAttachments(userCardIds);
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
