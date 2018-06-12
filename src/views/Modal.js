import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { TEXT_SIZE } from '../constants';
import { COLORS } from '../constants/colors';
import { connect } from 'react-redux';


const Modal = (props) => {
  return (
    <View style={styles.main}>

    </View>
  );
};

Modal.propTypes = {
  navigator: PropTypes.object,
  userInfo: PropTypes.object,
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE
  },
  text: {
    color: COLORS.FIORD,
    fontSize: TEXT_SIZE,
    textAlign: 'center'
  },
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Modal);

