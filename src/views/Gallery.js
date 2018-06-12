import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { COLORS, ROUTES, WINDOW_WIDTH } from '../constants';
import { getAlbums } from '../actions/fetchData';
import { setError } from '../actions/root';
import Photo from '../components/Photo';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.id === 'willAppear') {
      this.props.getAlbums(1); // TODO - replace
      }
  }

  goToAlbum(item) {
    this.props.navigator.push({
      screen: ROUTES.ALBUM,
      title: item.title,
      passProps: {
        item
      }
    });
  }

  getItem(item) {
    const random = Math.floor(Math.random() * item.photos.length);
    return (<TouchableHighlight
      key={item.id}
      onPress={() => this.goToAlbum(item)}>
      <Photo title={item.title} image={item.photos[random].thumbnailUrl}/>
    </TouchableHighlight>);
  }

  render() {
    return (
      <View style={styles.main}>
        <View>
          {this.props.albums &&
            <View>
              <ScrollView contentContainerStyle={styles.list}>
                {this.props.albums.map(item => this.getItem(item))}
              </ScrollView>
            </View>}
        </View>
      </View>
    );
  }
}

Gallery.propTypes = {
  navigator: PropTypes.object,
  getAlbums: PropTypes.func,
  userInfo: PropTypes.object,
  albums: PropTypes.array,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    marginBottom: 30,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingLeft: WINDOW_WIDTH * 0.01,
    paddingRight: WINDOW_WIDTH * 0.01,
  }
});

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  albums: state.albums.albums,
});

export default connect(mapStateToProps, { getAlbums, setError })(Gallery);

