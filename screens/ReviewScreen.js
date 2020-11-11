import React, { Component } from 'react';
import { View, Text, Platform, ScrollView } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Marker } from 'react-native-maps';

class ReviewScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Review Jobs',
      headerRight:(
        <Button
          onPress={() => navigation.navigate('settings')}
          title="Settings"
          type="outline"
        />
      ),
      headerStyle: {
        backgroundColor: 'orange',
        marginTop: Platform.OS === 'android' ? 10 : 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarIcon: ({ tintColor }) => {
        return <Icon name="favorite" size={26} color={tintColor}/>
      },
    }
  };

  renderLikedJobs(){
    return this.props.likedJobs.map(job => {
      const initialRegion = {
        longitude: job.venue.location.lng,
        latitude: job.venue.location.lat,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      }
      return (
        <Card title={job.venue.name} key={job.referralId}>
          <View style={{ height: 200 }}>
          <MapView
            liteMode
            scrollEnabled={false}
            style={{ flex: 1 }}
            rotateEnabled={false}
            initialRegion={initialRegion}
          >
            <Marker
              coordinate= {initialRegion}
            />
          </MapView>
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{job.venue.location.address}</Text>
            </View>
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
          {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  detailWrapper:{
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics:{
    fontStyle: 'italic'
  }
}
function mapStateToProps(state) {
  return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
