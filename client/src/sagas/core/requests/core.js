import { call } from 'redux-saga/effects';

import { fetchBoardByCurrentPath } from './boards';
import request from '../request';
import api from '../../../api';
import mergeRecords from '../../../utils/merge-records';

export function* fetchCore() {
  const { item: user } = yield call(request, api.getCurrentUser, true);
  const { items: users1 } = yield call(request, api.getUsers);

  const {
    items: projects1,
    included: { projectManagers, boards, boardMemberships: boardMemberships1 },
  } = yield call(request, api.getProjects);

  const {
    items: userCards,
    included: {
      cardMemberships: cardMemberships1,
      cardLabels: cardLabels1,
      tasks: tasks1,
      attachments: attachments1,
    },
  } = yield call(request, api.getCurrentUserCards);

  let board;
  let card;
  let users2;
  let projects2;
  let boardMemberships2;
  let labels;
  let lists;
  let cards1;
  let cardMemberships;
  let cardLabels;
  let tasks;
  let attachments;

  try {
    ({
      board,
      card,
      users: users2,
      projects: projects2,
      boardMemberships: boardMemberships2,
      labels,
      lists,
      cards: cards1,
      cardMemberships,
      cardLabels,
      tasks,
      attachments,
    } = yield call(fetchBoardByCurrentPath));
  } catch {} // eslint-disable-line no-empty

  const body = yield call(request, api.getNotifications);

  let { items: notifications } = body;

  const {
    included: { users: users3, cards: cards2, activities },
  } = body;

  if (card) {
    const notificationIds = notifications.flatMap((notification) =>
      notification.cardId === card.id ? [notification.id] : [],
    );

    if (notificationIds.length > 0) {
      yield call(request, api.updateNotifications, notificationIds, {
        isRead: true,
      });

      notifications = notifications.filter(
        (notification) => !notificationIds.includes(notification.id),
      );
    }
  }

  return {
    user,
    board,
    projectManagers,
    boards,
    labels,
    lists,
    cardMemberships: mergeRecords(cardMemberships1, cardMemberships),
    cardLabels: mergeRecords(cardLabels1, cardLabels),
    tasks: mergeRecords(tasks1, tasks),
    attachments: mergeRecords(attachments1, attachments),
    activities,
    notifications,
    users: mergeRecords(users1, users2, users3),
    projects: mergeRecords(projects1, projects2),
    boardMemberships: mergeRecords(boardMemberships1, boardMemberships2),
    cards: mergeRecords(userCards, cards1, cards2),
  };
}

export default {
  fetchCore,
};
