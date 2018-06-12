import React, { Component } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../constants/colors';
import { connect } from 'react-redux';
import Photo from '../components/Photo';
import { CENTER_STYLE, PLUS, WINDOW_WIDTH } from '../constants';


class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      activeItem: null
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  async setModalVisible(modalVisible, activeItem) {
    await this.setState({ modalVisible, activeItem });
  }

  async addImageItem(item) {
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
                this.addImageItem(!this.state.modalVisible, null);
              }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: PLUS }}
              />
            </TouchableHighlight>

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
      </View>
    );
  }
}

Album.propTypes = {
  navigator: PropTypes.object,
  item: PropTypes.object,
};

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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Album);

