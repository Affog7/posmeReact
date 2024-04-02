// reducer.js
import { FETCH_DATA_SUCCESS } from '../actions/dataActions';
import { FETCH_DATA_SUCCESS1 } from '../actions/historiqueActions';

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS, FETCH_DATA_SUCCESS1:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
