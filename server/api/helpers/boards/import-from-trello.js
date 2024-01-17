module.exports = {
  inputs: {
    user: {
      type: 'ref',
      required: true,
    },
    board: {
      type: 'ref',
      required: true,
    },
    trelloBoard: {
      type: 'json',
      required: true,
    },
  },

  async fn(inputs) {
    const trelloToTrackerLabels = {};

    const getTrelloLists = () => inputs.trelloBoard.lists.filter((list) => !list.closed);

    const getUsedTrelloLabels = () => {
      const result = {};
      inputs.trelloBoard.cards
        .map((card) => card.labels)
        .flat()
        .forEach((label) => {
          result[label.id] = label;
        });

      return Object.values(result);
    };

    const getTrelloCardsOfList = (listId) =>
      inputs.trelloBoard.cards.filter((card) => card.idList === listId && !card.closed);

    const getAllTrelloCheckItemsOfCard = (cardId) =>
      inputs.trelloBoard.checklists
        .filter((checklist) => checklist.idCard === cardId)
        .map((checklist) => checklist.checkItems)
        .flat();

    const getTrelloCommentsOfCard = (cardId) =>
      inputs.trelloBoard.actions.filter(
        (action) =>
          action.type === 'commentCard' &&
          action.data &&
          action.data.card &&
          action.data.card.id === cardId,
      );

    const getTrackerLabelColor = (trelloLabelColor) =>
      Label.COLORS.find((color) => color.indexOf(trelloLabelColor) !== -1) || 'desert-sand';

    const importCardLabels = async (TrackerCard, trelloCard) => {
      return Promise.all(
        trelloCard.labels.map(async (trelloLabel) => {
          return CardLabel.create({
            cardId: TrackerCard.id,
            labelId: trelloToTrackerLabels[trelloLabel.id].id,
          });
        }),
      );
    };

    const importTasks = async (TrackerCard, trelloCard) => {
      // TODO find workaround for tasks/checklist mismapping, see issue trello2Tracker#5
      return Promise.all(
        getAllTrelloCheckItemsOfCard(trelloCard.id).map(async (trelloCheckItem) => {
          return Task.create({
            cardId: TrackerCard.id,
            position: trelloCheckItem.pos,
            name: trelloCheckItem.name,
            isCompleted: trelloCheckItem.state === 'complete',
          }).fetch();
        }),
      );
    };

    const importComments = async (TrackerCard, trelloCard) => {
      const trelloComments = getTrelloCommentsOfCard(trelloCard.id);
      trelloComments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      return Promise.all(
        trelloComments.map(async (trelloComment) => {
          return Action.create({
            cardId: TrackerCard.id,
            userId: inputs.user.id,
            type: 'commentCard',
            data: {
              text:
                `${trelloComment.data.text}\n\n---\n*Note: imported comment, originally posted by ` +
                `\n${trelloComment.memberCreator.fullName} (${trelloComment.memberCreator.username}) on ${trelloComment.date}*`,
            },
          }).fetch();
        }),
      );
    };

    const importCards = async (TrackerList, trelloList) => {
      return Promise.all(
        getTrelloCardsOfList(trelloList.id).map(async (trelloCard) => {
          const TrackerCard = await Card.create({
            boardId: inputs.board.id,
            listId: TrackerList.id,
            creatorUserId: inputs.user.id,
            position: trelloCard.pos,
            name: trelloCard.name,
            description: trelloCard.desc || null,
          }).fetch();

          await importCardLabels(TrackerCard, trelloCard);
          await importTasks(TrackerCard, trelloCard);
          await importComments(TrackerCard, trelloCard);

          return TrackerCard;
        }),
      );
    };

    const importLabels = async () => {
      return Promise.all(
        getUsedTrelloLabels().map(async (trelloLabel, index) => {
          const TrackerLabel = await Label.create({
            boardId: inputs.board.id,
            position: 65535 * (index + 1), // TODO: move to config
            name: trelloLabel.name || null,
            color: getTrackerLabelColor(trelloLabel.color),
          }).fetch();

          trelloToTrackerLabels[trelloLabel.id] = TrackerLabel;
        }),
      );
    };

    const importLists = async () => {
      return Promise.all(
        getTrelloLists().map(async (trelloList) => {
          const TrackerList = await List.create({
            boardId: inputs.board.id,
            name: trelloList.name,
            position: trelloList.pos,
          }).fetch();

          return importCards(TrackerList, trelloList);
        }),
      );
    };

    await importLabels();
    await importLists();
  },
};
