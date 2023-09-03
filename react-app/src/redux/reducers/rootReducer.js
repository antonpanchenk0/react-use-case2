import { combineReducers } from 'redux';
import recordsReducer from './recordsReducer';

const rootReducer = combineReducers({
  recordsReducer,
});

export default rootReducer;
