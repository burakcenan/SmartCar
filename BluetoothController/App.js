import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Root from './app/service/Root'

import Main from "./app/screen/Main";

export default class App extends Component {
	render() {
	  return (
		<View style={styles.container}>
		  <Root />
		</View>
	  );
	}
  }
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1
	}
  });