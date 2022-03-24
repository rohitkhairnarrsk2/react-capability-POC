import { ActionsKey } from "../constants/constants";
import * as central from "../../core/services/centralService";
const defaultState = {
  token: null,
  currentUser: null,
};

export const centralReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ActionsKey.setToken:
      central.setToken(action.token);
      return { ...state, token: action.token };
    case ActionsKey.getToken:
      return { ...state, token: central.getToken() };
    case ActionsKey.setCurrentUser:
      central.setUserData(action.user);
      return { ...state, currentUser: action.user };
    case ActionsKey.getCurrentUser:
      central.getUserData(action.user);
      return { ...state, currentUser: central.getUserData() };
    case ActionsKey.logOut:
      central.clearCache();
      return { ...state };
    default:
      return state;
  }
};

export default centralReducer;
