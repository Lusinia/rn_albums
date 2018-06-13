import * as types from './actionTypes';
import Axios from 'axios';
import { BASE_URL } from '../../constants';
import { error } from '../root';
import { AsyncStorage } from 'react-native';
import { ERRORS } from '../../constants/errors';


/* Action Creator */
export const fetchUserData = payload => ({
  type: types.USERDATA,
  payload
});

export const fetchUserAlbums = payload => ({
  type: types.ALBUMS,
  payload
});

export const imageData = payload => ({
  type: types.LOCAL_IMAGE,
  payload
});


const fetchUserRequest = userId => dispatch => {
  if (!userId) {
    dispatch(fetchUserData(null));
  } else {
    return Axios.get(`${BASE_URL}/users/${userId}`)
      .then(res => {
        AsyncStorage.removeItem('user').then(() => {
          AsyncStorage.setItem('user', JSON.stringify(res.data)).then(() => {
            dispatch(fetchUserData(res.data));
          });
        });
      }, err => {
        dispatch(error({
          context: ERRORS.FETCH_USER,
          message: err.message
        }));
      });
  }
};


const fetchAlbumsRequest = userId => dispatch => Axios.get(`${BASE_URL}/users/${userId}/albums`)
  .then(res => {
    const result = [];
    AsyncStorage.getItem('localImages').then(albums => {
      AsyncStorage.getItem('user').then(user => {
        const localImages = albums ? JSON.parse(albums) : [];
        const isBelongToUser = localImages.length ? JSON.parse(albums)[0].userId === user.id : false;

        Promise.all(res.data.map(async (alb) => {
          const response = await Axios.get(`${BASE_URL}/albums/${alb.id}/photos`);
          const findLocal = isBelongToUser ? localImages.filter(i => i.albumId === alb.id) : [];
          const resultObj = { ...alb, photos: [...findLocal, ...response.data] };
          result.push(resultObj);
        })).then(() => {
          dispatch(fetchUserAlbums(result));
        });
      });
    });
  }, err => {
    dispatch(error({
      context: ERRORS.FETCH_ALBUMS,
      message: err.message
    }));
  });


const imageManipulations = (album, src) => dispatch => {

  const isExist = album.photos.find(item => item.url === src);
  let updatedAlbum = null;

  if (!isExist) {
    const { id, title } = album;
    const newPhoto = {
      albumId: id,
      id: album.photos.length + 1,
      thumbnailUrl: src,
      title,
      url: src
    };

    updatedAlbum = {
      ...album,
      photos: [
        ...album.photos,
        newPhoto
      ]
    };
    try {
      AsyncStorage.getItem('localImages').then(data => {
        const images = data ? JSON.parse(data) : [];
        if (!images.find(i => src === i.src)) {
          images.unshift(newPhoto);
        }
        AsyncStorage.setItem('localImages', JSON.stringify(images)).then(() => {
          return dispatch(imageData(updatedAlbum));
        });
      });
    } catch (err) {
      dispatch(error({
        context: ERRORS.IMAGE_STORAGE,
        message: err.message
      }));
      return dispatch(imageData(updatedAlbum));
    }
  }
};


/* Dispatch the actionCreator */

export const getUser = (ID) => dispatch => {
  dispatch(fetchUserRequest(ID));
};

export const getAlbums = (ID) => dispatch => {
  dispatch(fetchAlbumsRequest(ID));
};


export const setImageData = (album, src) => dispatch => {
  dispatch(imageManipulations(album, src));
};

