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


const fetchUserRequest = userId => dispatch => Axios.get(`${BASE_URL}/users/${userId}`)
  .then(res => {
    dispatch(fetchUserData(res.data));
  }, err => {
    dispatch(error('FetchDataRequest', err.message));
  });


const fetchAlbumsRequest = userId => dispatch => Axios.get(`${BASE_URL}/users/${userId}/albums`)
  .then(res => {
    const result = [];

    Promise.all(res.data.map(async(alb) => {
      const response = await Axios.get(`${BASE_URL}/albums/${alb.id}/photos`);
      result.push({ ...alb, photos: response.data });
    })).then (() => {
      dispatch(fetchUserAlbums(result));
    });
  }, err => {
    dispatch(error('FetchAlbumsRequest', err.message));
  });


/* Dispatch the actionCreator */

export const getUser = (ID) => dispatch => {
  dispatch(fetchUserRequest(ID));
};

export const getAlbums = (ID) => dispatch => {
  dispatch(fetchAlbumsRequest(ID));
};

