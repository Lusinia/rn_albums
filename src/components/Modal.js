import React, { Component } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  CENTER_STYLE,
  COLORS,
  IMAGESET_PLACEHOLDER,
  PADDING_MIXIN,
  TEXT_SIZE,
  WINDOW_WIDTH
} from '../constants';

class ModalWrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      imageName: null
    };
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible }, () => {
      this.props.addImage(this.state.imageName);
    });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}
        >
          <View style={styles.main}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={IMAGESET_PLACEHOLDER}
                placeholderTextColor={COLORS.RAVEN}
                onChangeText={(imageName) => this.setState({ imageName })}
                editable={true}
                value={this.state.imageName}
                underlineColorAndroid={COLORS.TRANSPARENT}
                maxLength={40}/>
              <Button
                onPress={() => this.setModalVisible(false)}
                disabled={!this.state.imageName}
                color={COLORS.CURIOUS_BLUE}
                title={'Set Image Name'}
              />
              <Button
                onPress={() => this.setModalVisible(false)}
                color={COLORS.RED}
                title={'Cancel'}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.DARK_TRANSPARENT,
    width: WINDOW_WIDTH,
    ...CENTER_STYLE
  },
  inputWrapper: {
    width: WINDOW_WIDTH * 0.7,
    height: WINDOW_WIDTH * 0.7,
    backgroundColor: COLORS.WHITE,
    marginBottom: 5,
    borderColor: COLORS.FIORD,
    borderWidth: 2,
    justifyContent: 'space-around',
    ...PADDING_MIXIN
  },
  text: {
    fontSize: TEXT_SIZE,
    color: COLORS.WHITE,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textShadowColor: COLORS.FIORD,
    ...PADDING_MIXIN
  },
  input: {
    paddingLeft: 20,
    height: 40,
    borderRadius: 5,
    width: '100%',
    borderColor: COLORS.RAVEN,
    borderWidth: 1
  }
});

ModalWrapper.propTypes = {
  activeItem: PropTypes.object,
  addImage: PropTypes.func,
};

export default ModalWrapper;

