import rootReducer from '../rootReducer';
import recordsReducer, { initialState as recordsInitialState } from '../recordsReducer';

describe('rootReducer', () => {

  // Test Initial State
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual({
      recordsReducer: recordsInitialState,
    });
  });

  // Test with a dummy action
  it('should delegate actions to child reducers', () => {
    const dummyAction = { type: 'DUMMY_ACTION', payload: {} };

    expect(rootReducer(undefined, dummyAction)).toEqual({
      recordsReducer: recordsReducer(undefined, dummyAction),
    });
  });
});
