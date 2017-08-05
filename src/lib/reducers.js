import { combineReducers } from 'redux';
import { createAsyncReducer } from 'redux-easy-async';
import { getItems } from './actions';

const items = (state = [], { type, payload }) => {
  switch (type) {
    case getItems.SUCCESS_TYPE:
      return payload;
    default:
      return state;
  }
};

// creates a reducer that will automatically track requests -- in this case just fetchPost
// note: this must be an array
const requestsReducer = createAsyncReducer([getItems]);

export default combineReducers({
  items,
  requests: requestsReducer,
});
