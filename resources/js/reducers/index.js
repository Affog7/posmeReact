import { combineReducers } from 'redux';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  // Add other reducers if needed
});

export default rootReducer;
