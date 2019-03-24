import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  BarCodeScanner,
  Permissions,
  Speech
} from 'expo';
import Home from '../App'
export default class scannerQR extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasCameraPermission: null,
      scannedText: null,
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  }

  _handleBarCodeRead = result => {
    if (result.data !== this.state.scannedText) {
      LayoutAnimation.spring();
      this.setState({ scannedText: result.data });
      Speech.speak(
        result.data,
        {
          language: 'es',
          pitch: 1,
          rate: 0.75
        }
      )
    }
  }

  _handlePressCancel = () => {
    this.setState({ scannedText: null });
  }

  // handleBack(){
  //   return (
  //     <View>
  //       <Button 
  //         title='Back'
  //         onPress={()=> {this.props.navigation.navigate('Home')}}
  //       />
  //     </View>
  //   )
  // }

  _maybeRenderUrl = () => {
    if (!this.state.scannedText) return;
    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url}>
          <Text
            numberOfLines={1}
            style={[styles.urlText, styles.whiteText]}
          >
            {this.state.scannedText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}>
          <Text style={styles.cancelButtonText}>
            Huellitas
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.handleBack()} */}
        {this.state.hasCameraPermission === null ? (
          <Text>Oczekiwanie na pozwolenie na użycie aparatu</Text>
        ) : (this.state.hasCameraPermission === false ? (
            <Text style={styles.whiteText}>
              Przyznano
            </Text>
          ) : (
            <View style={{height: Dimensions.get('window').height}}>
              <Button 
                title='Back'
                onPress={()=> {this.props.navigation.navigate('Home')}}
              />
              <Button 
                title='Go it'
                onPress={()=> {this.props.navigation.navigate('Home')}}
              />
              <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
              }}
            />
            </View>
          )
        )}
        {this._maybeRenderUrl()}
        <StatusBar hidden />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 18,
  },
  whiteText: {
    color: '#fff',
  },
});