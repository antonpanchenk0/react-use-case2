import * as constants from '../constants';

export const initialState = {
  records: [],
};

export const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_RECORD:
      return {
        ...state,
        records: [
          ...state.records,
          action.payload,
        ],
      };

    default:
      return state;
  }
}

const recordsSelector = (state) => state.recordsReducer.records;

export const selectors = {
  recordsSelector,
};

export default recordsReducer;
