import { combineReducers } from 'redux';
import RootReducer from "./RootReducer";
import FetchDataReducer from './FetchAlbumsReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  root: RootReducer,
  user: UserReducer,
  albums: FetchDataReducer,
});
