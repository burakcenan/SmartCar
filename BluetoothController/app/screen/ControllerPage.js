import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  Switch,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Icon,
  Button,
  Text,
  Left,
  Body,
  Title,
  Badge,
  Right
} from 'native-base';

import { Actions, Reducer } from 'react-native-router-flux'

import BluetoothSerial from 'react-native-bluetooth-serial'

import BgImage from '../img/bg.png'

//const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default class ControllerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
      sagSinyalAcikMi: false,
      solSinyalAcikMi: false,
    }
  }
  ileri() {
    BluetoothSerial.write("2")
      .then((res) => {
        console.log(res);
        console.log('2')
      })
  }
  geri() {
    BluetoothSerial.write("8")
      .then((res) => {
        console.log(res);
        console.log('8')
      })
  }
  sag() {
    BluetoothSerial.write("4")
      .then((res) => {
        console.log(res);
        console.log('4')
      })
  }
  sol() {
    BluetoothSerial.write("6")
      .then((res) => {
        console.log(res);
        console.log('6')
      })
  }
  sagileri() {
    BluetoothSerial.write("1")
      .then((res) => {
        console.log(res);
        console.log('1')
      })
  }
  saggeri() {
    BluetoothSerial.write("7")
      .then((res) => {
        console.log(res);
        console.log('7')
      })
  }
  solileri() {
    BluetoothSerial.write("3")
      .then((res) => {
        console.log(res);
        console.log('3')
      })
  }
  solgeri() {
    BluetoothSerial.write("9")
      .then((res) => {
        console.log(res);
        console.log('9')
      })
  }
  dur() {
    BluetoothSerial.write("5")
      .then((res) => {
        console.log(res);
        console.log('5----')
      })
  }
  SagSinyal() {
    BluetoothSerial.write("R")
      .then((res) => {
        console.log(res);
        console.log('Successfuly wrote to device')
        this.setState({ sagSinyalAcikMi: true })
      })
      .catch((err) => console.log(err.message))
  }
  SolSinyal() {
    BluetoothSerial.write("L")
      .then((res) => {
        console.log(res);
        console.log('Successfuly wrote to device')
        this.setState({ solSinyalAcikMi: true })
      })
      .catch((err) => console.log(err.message))
  }
  render() {
    return (
      <ImageBackground source={BgImage} style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.Main()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Kontrol</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.signalWrapper}>
            <TouchableOpacity style={styles.signal} onPress={this.SagSinyal.bind(this)}>
              <Icon type="FontAwesome" name="arrow-circle-left" style={styles.signalText} />
            </TouchableOpacity>

            <TouchableOpacity light style={styles.signal} onPress={this.SolSinyal.bind(this)}>
              <Icon type="FontAwesome" name="arrow-circle-right" style={styles.signalText} />
            </TouchableOpacity>
          </View>

          <View style={styles.yonWrapper}>
            <View>
              <Button light style={styles.yon} onPressIn={this.sagileri.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-top-left" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon} onPressIn={this.ileri.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-up" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon} onPressIn={this.solileri.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-top-right" />
              </Button>
            </View>
          </View>
          <View style={styles.yonWrapper}>
            <View>
              <Button light style={styles.yon} onPressIn={this.sag.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-left" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon} onPress={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="circle" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon} onPressIn={this.sol.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-right" />
              </Button>
            </View>
          </View>
          <View style={styles.yonWrapper}>
            <View>
              <Button light style={styles.yon} onPressIn={this.saggeri.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-bottom-left" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon} onPressIn={this.geri.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-down" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon} onPressIn={this.solgeri.bind(this)} onPressOut={this.dur.bind(this)}>
                <Icon type="MaterialCommunityIcons" name="arrow-bottom-right" />
              </Button>
            </View>
          </View>
        </Content>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  signalWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  yonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 25,
  },
  signal: {
    marginHorizontal: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signalText: {
    fontSize: 35,
    color: '#D9D9D9'
  },
  yon: {
    borderRadius: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  toolbarButton: {
    width: 50,
    marginTop: 8,
  },
});