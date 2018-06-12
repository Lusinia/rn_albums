import * as types from './actionTypes';


/* Action Creator */

export const changedTab = (payload) => ({
  type: types.ROOT_CHANGED,
  payload
});

export const error = (payload) => ({
  type: types.ERROR,
  payload
});

/* Dispatch the actionCreator */

export const selectTab = (data) => dispatch => {
    dispatch(changedTab(data));
};

export const setError = (data) => dispatch => {
  dispatch(error(data));
};