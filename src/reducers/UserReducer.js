import Immutable from 'seamless-immutable';
import { USERDATA } from '../actions/fetchData/actionTypes';

const initialState = Immutable({
  userInfo: null,
  albums: []
});

export default function UserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERDATA:
      return state.merge({
        userInfo: action.payload,
        albums: []
      });
    default:
      return state;
  }
}
