import { createSelector } from 'redux-orm';

import orm from '../orm';

export const makeSelectCardsByUserId = () =>
  createSelector(
    orm,
    (_, id) => id,
    ({ User }, id) => {
      const userModel = User.withId(id);

      if (!userModel) {
        return userModel;
      }

      return userModel.cards.orderBy('priority', 'desc').toRefArray();
    },
  );

export const selectCardsByUserId = makeSelectCardsByUserId();

export default {
  makeSelectCardsByUserId,
  selectCardsByUserId,
};
