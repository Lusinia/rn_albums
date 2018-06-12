import Immutable from 'seamless-immutable';
import * as types from "../actions/fetchData/actionTypes";


const initialState = Immutable({
  albums: [],
});

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case types.ALBUMS:
      return state.merge({
        albums: action.payload
      });
    default:
      return state;
  }
}
