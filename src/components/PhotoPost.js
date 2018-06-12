import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { CENTER_STYLE } from '../constants';

const Photo = (props) => {
  return (
    <View>
      <View style={styles.imageWrapper}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    ...CENTER_STYLE
  }
});

Photo.propTypes = {
  image: PropTypes.string,
};

export default Photo;

