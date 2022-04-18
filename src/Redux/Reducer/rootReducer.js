import { combineReducers } from "redux";
import UserReducer from "./userReducer";

const rootReducer = combineReducers({
  //Reducers
  user: UserReducer,
});

export default rootReducer;
