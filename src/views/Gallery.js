import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { COLORS } from '../constants';

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.main}>
        <View>
          <SectionList
            renderItem={({ item }) => (<Text>Hi</Text>)}
            sections={[]}
            keyExtractor={({ item }) => item.id}
            extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

Gallery.propTypes = {
  navigator: PropTypes.object,
  setData: PropTypes.func,
  fetchedData: PropTypes.array,
  selectedTab: PropTypes.number,
  selectTab: PropTypes.func,
  setCacheData: PropTypes.func,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
    marginBottom: 30
  }
});

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Gallery);

