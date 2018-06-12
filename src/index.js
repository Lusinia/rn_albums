import { Navigation } from 'react-native-navigation';
import { ROUTES } from './constants';
import Gallery from "./views/Gallery";
import Login from './views/Login';
import Album from './views/Album';
import Modal from './views/Modal';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent(ROUTES.GALLERY, () => Gallery, store, Provider);
  Navigation.registerComponent(ROUTES.ALBUM, () => Album, store, Provider);
  Navigation.registerComponent(ROUTES.MODAL, () => Modal, store, Provider);
  Navigation.registerComponent(ROUTES.LOGIN, () => Login, store, Provider);
};

export default registerScreens;