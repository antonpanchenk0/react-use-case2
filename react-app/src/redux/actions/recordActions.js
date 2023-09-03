import * as constants from '../constants';

export const addRecordAction = (payload) => ({
  type: constants.ADD_RECORD,
  payload,
});

export default addRecordAction;
