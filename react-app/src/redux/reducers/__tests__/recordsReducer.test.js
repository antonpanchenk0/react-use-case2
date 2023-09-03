import * as constants from '../../constants';
import recordsReducer, { initialState, selectors } from '../recordsReducer';

describe('recordsReducer', () => {

  // Test Initial State
  it('should have an initial state', () => {
    expect(recordsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // Test ADD_RECORD action
  it('should handle ADD_RECORD', () => {
    const newRecord = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      message: 'Hello'
    };

    const action = {
      type: constants.ADD_RECORD,
      payload: newRecord
    };

    const expectedState = {
      records: [newRecord]
    };

    expect(recordsReducer(initialState, action)).toEqual(expectedState);
  });

  // Test unknown action
  it('should return the current state when receiving an unknown action', () => {
    expect(recordsReducer(initialState, { type: 'UNKNOWN' })).toEqual(initialState);
  });
});

// Test Selectors
describe('records selectors', () => {
  it('recordsSelector should return records', () => {
    const state = {
      recordsReducer: {
        records: ['record1', 'record2']
      }
    };

    expect(selectors.recordsSelector(state)).toEqual(['record1', 'record2']);
  });
});
