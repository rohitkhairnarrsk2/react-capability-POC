import { combineReducers, createStore } from "redux";
import { centralReducer } from "./../actions/appActions";
import { ordersReducer } from "./../actions/ordersReducer";

const allReducers = combineReducers({ centralReducer, ordersReducer });
const centralStore = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default centralStore;
