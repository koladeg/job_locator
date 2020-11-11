import React, { Component } from 'react';
import { View, Text, LinearGradient } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';


class ModelScreen extends Component {


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ paddingLeft:10,paddingTop:15,fontSize:17,width:"80%",fontWeight:"bold" }}>
          Are you sure you want to do that?
        </Text>
          <Button
            onPress={() => {
              this.props.clearLikedJobs()
              this.props.navigation.goBack()
            }}
            title="RESET ALL LIKED JOBS"
            buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
            containerStyle={{ marginVertical: 10, height: 50, width: 250 }}
            titleStyle={{ fontWeight: 'bold' }}
          />
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Cancel"
            titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient}
              buttonStyle={{
                borderWidth: 0,
                borderColor: 'transparent',
                borderRadius: 20,
              }}
              containerStyle={{ marginVertical: 10, height: 40, width: 200 }}
          />
      </View>
    );
  }

}

export default connect (null, { clearLikedJobs }) (ModelScreen) ;
