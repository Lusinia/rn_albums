import * as types from './actionTypes';
import Axios from 'axios';
import { BASE_URL } from '../../constants';
import { error } from '../root';


/* Action Creator */
export const fetchUserData = payload => ({
  type: types.USERDATA,
  payload
});

export const fetchUserAlbums = payload => ({
  type: types.ALBUMS,
  payload
});

export const fetchUserRequest = (userId, isAlbums) => (dispatch) => {
  const url = isAlbums ? `${BASE_URL}/users/${userId}/albums` : `${BASE_URL}/users/${userId}`;
   return Axios.get(url)
    .then(res => {
      isAlbums ? dispatch(fetchUserAlbums(res.data)) : dispatch(fetchUserData(res.data)) ;
    }, err => {
      dispatch(error('FetchDataRequest', err.message));
    });
};

/* Dispatch the actionCreator */

export const getUser = (ID) => dispatch => {
  dispatch(fetchUserRequest(ID));
};

export const getAlbums = (ID) => dispatch => {
  dispatch(fetchUserRequest(ID, true));
};