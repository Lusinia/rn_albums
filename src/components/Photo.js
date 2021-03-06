import React from 'react';
import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, PADDING_MIXIN, TEXT_SIZE, WINDOW_WIDTH } from '../constants';

const Photo = (props) => {
  const image = props.image.split('https').length === 1 ?
    props.image.replace('http', 'https') : props.image;

  return (
      <View>
        {props.image ?
          <ImageBackground
            resizeMode='cover'
            style={[styles.imageWrapper, props.styles]}
            source={{ uri: image }}
          >
            <Text style={styles.text}>{props.title}</Text>
          </ImageBackground>
          :
          <ImageBackground
            resizeMode='cover'
            style={[styles.imageWrapper, { justifyContent: 'center' }]}
            source={require('../assets/photo-placeholder.png')}
          >
            <ActivityIndicator size="small" color={COLORS.CURIOUS_BLUE}/>
          </ImageBackground>
        }
      </View>
    );
};

const styles = StyleSheet.create({
  imageWrapper: {
    width: WINDOW_WIDTH * 0.48,
    height: WINDOW_WIDTH * 0.48,
    backgroundColor: COLORS.CHALICE,
    marginBottom: 5,
    borderColor: COLORS.FIORD,
    borderWidth: 2,
    justifyContent: 'flex-end'
  },
  text: {
    fontSize: TEXT_SIZE,
    color: COLORS.WHITE,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textShadowColor: COLORS.FIORD,
    ...PADDING_MIXIN
  }
});

Photo.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.object,
};

export default Photo;

