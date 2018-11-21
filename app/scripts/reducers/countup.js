import produce from 'immer';

import { COUNT_UP, RESET } from '../actions/countup';

const initialState = {
  count: 0
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case COUNT_UP:
      case RESET:
        draft.count = action.payload.count;
        break;
    }
  });
