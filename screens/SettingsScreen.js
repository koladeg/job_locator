import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'orange',
      marginBottom: Platform.OS === 'android' ? 24 : 0,
    },
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="favorite" size={26} color={tintColor}/>
    },
  }

  render() {
    return (
      <View>
          <Button
            title= "Reset Liked Jobs"
            large
            icon={{ name: 'delete-forever'}}
            onPress={this.props.clearLikedJobs}
            buttonStyle={styles.headerButton}
          />
      </View>
    );
  }
}

const styles = {
  headerButton: {
    backgroundColor: "#F44336"
  }
}

export default connect (null, { clearLikedJobs }) (SettingsScreen) ;
