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
  Title
} from 'native-base';

import { Actions } from 'react-native-router-flux'
 
import BluetoothSerial from 'react-native-bluetooth-serial'

import BgImage from '../img/bg.png'

//const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default class ControllerPage extends Component {
  constructor (props) {
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
  motoruCalistir(){
    BluetoothSerial.write("2")
    .then((res) => {
      console.log(res);
      console.log('Successfuly wrote to device')
    })
    .catch((err) => console.log(err.message))
  }
  SagSinyal(){
    if(!sagSinyalAcikMi){
    BluetoothSerial.write("1")
    .then((res) => {
    console.log(res);
    console.log('Successfuly wrote to device')
    })
    .catch((err) => console.log(err.message))
  }else{
    BluetoothSerial.write("4")
    .then((res) => {
    console.log(res);
    console.log('Successfuly wrote to device')
    })
    .catch((err) => console.log(err.message))
  }
}
SolSinyal(){
  if(!sagSinyalAcikMi){
    BluetoothSerial.write("3")
    .then((res) => {
    console.log(res);
    console.log('Successfuly wrote to device')
    })
    .catch((err) => console.log(err.message))
  }else{
    BluetoothSerial.write("5")
    .then((res) => {
    console.log(res);
    console.log('Successfuly wrote to device')
    })
    .catch((err) => console.log(err.message))
  }
}
  render() {
    return (
    <ImageBackground source={BgImage} style={styles.container}> 
        <Header>
          <Left>
            <Button transparent onPress={()=>Actions.Main()}>
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
              <Icon type="FontAwesome" name="arrow-circle-left"  style={styles.signalText}/>
            </TouchableOpacity>

            <TouchableOpacity light style={styles.signal} onPress={this.SolSinyal.bind(this)}>
              <Icon type="FontAwesome" name="arrow-circle-right" style={styles.signalText}/>
            </TouchableOpacity>
          </View>

          <View style={styles.yonWrapper}>
            <View>
              <Button light style={styles.yon}>
                <Icon type="FontAwesome" name="arrow-left" />
              </Button>
            </View>
            <View>
              <Button light style={styles.yon}>
                <Icon type="FontAwesome" name="arrow-right" />
              </Button>
            </View>
          </View>

          <Button full onPress={this.motoruCalistir.bind(this)}>
              <Text>Motoru Çalıştır.</Text>
          </Button>
          
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>
              <Icon active type="Entypo" name="game-controller" />
              <Text>Kontrol</Text>
            </Button>
            <Button vertical>
              <Icon type="FontAwesome" name="list-alt" onPress={()=>Actions.DetaylarPage()}/>
              <Text>Detaylar</Text>
            </Button>
          </FooterTab>
        </Footer>
    </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  signalWrapper:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
  yonWrapper:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 75,
    marginVertical: 50,
  },
  signal:{
    marginHorizontal: 5,
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signalText:{
    fontSize: 35,
    color: '#D9D9D9'
  },
  yon:{
    borderRadius: 10,
  },
  toolbarButton:{
    width: 50,
    marginTop: 8,
  },
});