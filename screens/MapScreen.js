import React, { Component } from 'react';
import Expo, { MapView, Permissions, Location } from 'expo';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions'


class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  }
  state = {
    region: null,
  }
  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
    console.log('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.045,
      latitudeDelta: 0.095,
    }
    this.setState({ region });
  };



  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck')
    });
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <MapView
            initialRegion={this.state.region}
            showsUserLocation
            style={{ flex: 1}}
            onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style = {styles.buttonContainer}>
          <Button
            large
            title="Find Hospitals In Area"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
            buttonStyle={styles.headerButton}
            containerStyle={{ marginVertical: 10, height: 50, width: 350 }}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerButton: {
    backgroundColor: "#009688",
    borderRadius: 4,
    borderWidth: 0.5,

  }
}

export default connect(null, actions)(MapScreen) ;
