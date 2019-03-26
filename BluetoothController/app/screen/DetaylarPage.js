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
  Body,
  Left,
  Title
} from 'native-base';

import { Actions } from 'react-native-router-flux'
 
import BluetoothSerial from 'react-native-bluetooth-serial'

import BgImage from '../img/bg.png'

//const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default class DetaylarPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEnabled: false,
      discovering: false,
      devices: [],
      unpairedDevices: [],
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
            <Title>Detaylar</Title>
          </Body>
        </Header>
        <Content>
        
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon type="Entypo" name="game-controller" onPress={()=>Actions.ControllerPage()}/>
              <Text>Kontrol</Text>
            </Button>
            <Button vertical active>
              <Icon active type="FontAwesome" name="list-alt" />
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