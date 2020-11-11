import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';
import { Card, Button, Icon } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from '../actions';


class DeckScreen extends Component {

  renderCard(job){
    const initialRegion = {
      longitude: job.venue.location.lng,
      latitude: job.venue.location.lat,
      longitudeDelta: 0.02,
      latitudeDelta: 0.045
    }
    return (
      <Card
        title={job.venue.name}
      >
        <View style={{ height: 300}}>
          <MapView
            liteMode
            scrollEnabled={false}
            style={{ flex: 1 }}
            initialRegion={initialRegion}

          >
            <Marker
              coordinate= {initialRegion}
            />
          </MapView>
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.venue.location.address}</Text>
        </View>
        <Text>
         This is a spot
        </Text>
      </Card>
    );
  }
  renderNoMoreCards = () => {
    return (
      <Card title="No More Hospitals">
        <Button
          title="Back to Map"
          large
          icon={{ name: "my-location"}}
          backgroundColor="#03A9F4"
          onPress={() => this.props.navigation.navigate('map')}
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 20}}>
          <Swipe
            data={this.props.jobs}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeRight={job => this.props.likeJob(job)}
            keyProp="referralId"
          />
      </View>
    );
  }
}

const styles = {
  detailWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
}

function mapStateToProps({ jobs }) {
  return { jobs: jobs };
}

export default connect(mapStateToProps, actions) (DeckScreen) ;
