import * as constants from '../constants';

export const addRecord = (payload) => ({
  type: constants.ADD_RECORD,
  payload,
});

export default addRecord;
