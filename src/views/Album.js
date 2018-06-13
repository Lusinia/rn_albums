import React, { Component } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../constants/colors';
import { connect } from 'react-redux';
import Photo from '../components/Photo';
import { CENTER_STYLE, PLUS, ROUTES, TEXT_SIZE, WINDOW_WIDTH } from '../constants';
import ImagePicker from 'react-native-image-picker';
import { setError } from '../actions/root';
import { setImageData } from '../actions/fetchData';
import ModalWrapper from '../components/Modal';


class Album extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Logout',
        id: 'logout',
        buttonColor: COLORS.RED,
        buttonFontSize: TEXT_SIZE,
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      activeItem: null,
      addedImage: [],
      isLoading: false,
      isOpenModal: false,
      imageName: null,
      isOpenInput: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'logout') {
        this.props.navigator.resetTo({
          screen: ROUTES.LOGIN
        });
      }
    }
  }

  async setModalVisible(modalVisible, activeItem) {
    await this.setState({ modalVisible, activeItem });
  }

  addImageItem(name) {
    this.setState({ isOpenInput: false });

    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({
          addedImage: [...this.state.addedImage, {
            uri: response.uri,
            title: name
          }]
        });
        this.props.setImageData(this.props.item, response.uri);
      } else if (response.error) {
        this.props.setError('Error while load image.');
      }
    });
  }

  openModalWindow() {
    this.setState({ isOpenInput: true });
  }

  getItem(item) {
    return (
      <TouchableHighlight
        key={item.id}
        onPress={() => {
          this.setModalVisible(true, item);
        }}>
        <Photo
          title={item.title}
          image={item.thumbnailUrl}
        />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        {this.props.item &&
        <View>
          <ScrollView contentContainerStyle={styles.list}>
            <TouchableHighlight
              style={styles.plusButton}
              onPress={() => {
                this.openModalWindow();
              }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: PLUS }}
              />
            </TouchableHighlight>

            {this.state.addedImage.length ?
              this.state.addedImage.map(item => (
                <Photo
                  key={`${item.id}${item.title}`}
                  title={item.title}
                  image={item.uri}
                />))
              : null}

            {this.props.item.photos.map(item => this.getItem(item))}
          </ScrollView>
        </View>}


        {this.state.activeItem &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={[styles.modal, { backgroundColor: COLORS.DARK_TRANSPARENT }]}>
            <TouchableHighlight
              style={styles.modal}
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible, null);
              }}>
              <Photo
                styles={styles.modalImage}
                key={this.state.activeItem.id}
                title={''}
                image={this.state.activeItem.url}
              />
            </TouchableHighlight>
          </View>
        </Modal>
        }
        {this.state.isOpenInput &&
          <ModalWrapper
            addImage={this.addImageItem.bind(this)}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingLeft: WINDOW_WIDTH * 0.01,
    paddingRight: WINDOW_WIDTH * 0.01,
  },
  modal: {
    flex: 1,
    ...CENTER_STYLE
  },
  modalImage: {
    width: WINDOW_WIDTH * 0.9,
    height: WINDOW_WIDTH * 0.9,
  },
  plusButton: {
    backgroundColor: COLORS.RAVEN,
    width: WINDOW_WIDTH * 0.48,
    height: WINDOW_WIDTH * 0.48,
    ...CENTER_STYLE
  }
});

Album.propTypes = {
  navigator: PropTypes.object,
  setError: PropTypes.func,
  setImageData: PropTypes.func,
  item: PropTypes.object,
};

export default connect(null, { setImageData, setError })(Album);

