import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {

  static navigationOptions = ({ screenProps }) => {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={26} color={tintColor}/>
    }
  }

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
      const {
        name, display_phone, url, coordinates, review_count, id
      } = job;
      const initialRegion = {
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };
      return (
        <Card title={name} key={id}>
          <View style={{ height: 200 }}>
          <MapView
            liteMode
            scrollEnabled={false}
            style={{ flex: 1 }}
            rotateEnabled={false}
            initialRegion={initialRegion}
          />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{review_count}</Text>
              <Text style={styles.italics}>{display_phone}</Text>
            </View>
            <Button
              title="Apply Now"
              backgroundColor= "#03A9F4"
              onPress={()=> Linking.openURL(url)}
            />
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
