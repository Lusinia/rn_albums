import Immutable from 'seamless-immutable';
import * as types from "../actions/fetchData/actionTypes";


const initialState = Immutable({
  albums: [],
});

export default function (state = initialState, action = {}) {
  let updateList = null;

  switch (action.type) {
    case types.ALBUMS:
      return state.merge({
        albums: action.payload.sort((a, b) => b.id < a.id)
      });
    case types.LOCAL_IMAGE:
        updateList = [...state.albums];
      if (action.payload) {
        const index = updateList.findIndex(item => item.id === action.payload.id);
        updateList.splice(index, 1, action.payload);
      }
      return state.merge({
        albums: updateList.sort((a, b) => b.id < a.id)
      });
    default:
      return state;
  }
}
