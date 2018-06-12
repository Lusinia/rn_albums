import React, { Component } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CENTER_STYLE, PADDING_MIXIN, TEXT_SIZE, WINDOW_WIDTH } from '../constants';
import { connect } from 'react-redux';
import { COLORS } from '../constants/colors';
import PropTypes from 'prop-types';
import { ROUTES } from '../constants/routes';
import { getUser } from '../actions/fetchData';
import { setError } from '../actions/root';
import { ERRORS } from '../constants/errors';

class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    drawUnderStatusBar: Platform.OS !== 'ios',
    statusBarColor: COLORS.BLACK,
    disabledBackGesture: true
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      text: null
    };
    this.startApp = this.startApp.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  startApp() {
    this.props.navigator.resetTo({
      screen: ROUTES.GALLERY,
      title: this.props.userInfo.name,
      anamated: true,
      animationType: 'slide-horizontal'
    });
  }

  async sendRequest() {
    this.setState({ isLoading: true });
    await this.props.getUser(this.state.text.trim());
    this.setState({ isLoading: false, text: null });
  }

  isError(error) {
    return error && error.context === ERRORS.FETCH_USER;
  }

  render() {
    if (this.props.userInfo) {
      this.startApp();
    }
    return (
      <View style={styles.container}>

        <View>
          <TextInput
            style={[styles.input, { borderColor: this.isError(this.props.error) ? COLORS.RED : COLORS.RAVEN }]}
            placeholder={'Enter user ID'}
            placeholderTextColor={COLORS.RAVEN}
            onFocus={() => this.props.setError(null)}
            onChangeText={(text) => this.setState({ text })}
            editable={true}
            value={this.state.text}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            maxLength={40}
          />

          <View style={styles.button}>
            <TouchableOpacity onPress={this.sendRequest}>
              <Text style={styles.text}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.state.isLoading &&
        <View style={styles.bottomBlock}>
          <ActivityIndicator size="large" color={COLORS.RAVEN}/>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  button: {
    marginTop: 30,
    ...PADDING_MIXIN,
    backgroundColor: COLORS.CURIOUS_BLUE,
    borderRadius: 5,
    width: WINDOW_WIDTH * 0.7
  },
  text: {
    textAlign: 'center',
    fontSize: TEXT_SIZE,
    color: COLORS.WHITE
  },
  input: {
    paddingLeft: 20,
    height: 40,
    borderRadius: 5,
    width: WINDOW_WIDTH * 0.7,
    borderColor: COLORS.RAVEN,
    borderWidth: 1
  },
  bottomBlock: {
    ...CENTER_STYLE,
    position: 'absolute',
    flexDirection: 'row',
    top: '30%',
    width: WINDOW_WIDTH
  }
});
Login.propTypes = {
  navigator: PropTypes.object,
  getUser: PropTypes.func,
  setError: PropTypes.func,
  userInfo: PropTypes.object,
  error: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  error: state.root.error
});

export default connect(mapStateToProps, { getUser, setError })(Login);
