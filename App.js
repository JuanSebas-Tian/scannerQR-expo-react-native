import React, {Component} from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import Scanner from './scanner/scannerQR';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

export default class App extends Component {
  render() {
    return (
      <Container/>
    );
  }
}

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button 
          style={styles.buttonText}
          title='I want to scanner QR code'
          onPress={()=>{ this.props.navigation.navigate('Scanner') }}
        />
      </View>
    )
  }
}

const Switch = createSwitchNavigator({
  Home: { screen: HomeScreen },
  Scanner: { screen: Scanner }
})

// const Stack = createStackNavigator({
//   MainScreen: { screen: HomeScreen },
//   SecondScreen: { screen: Scanner }
// })

const Container = createAppContainer(Switch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontWeight: '500',
    color: '#000',
    fontSize: 21,
    padding: 16,
    color: 'white',
    backgroundColor: 'rgb(0,122,255)',
    borderRadius: 50,
  },
  buttonTouchable: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});